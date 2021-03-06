import React from 'react'

import { Editor } from '@contentkit/editor'
import { HANDLED, Command, insertAtomic, Block } from '@contentkit/util'
import { useApolloClient } from '@apollo/client'
import { Fade, LinearProgress } from '@material-ui/core'
import gql from 'graphql-tag'

import '@contentkit/editor/src/css/CheckableListItem.css'
import { Dropzone } from '@contentkit/components'
import { DropzoneVariant } from '@contentkit/components/lib/types'

import { CREATE_IMAGE } from '../../graphql/mutations'
import useStyles from './styles'
import { AWS_BUCKET_URL } from '../../lib/config'

const UPLOAD_MUTATION = gql`
  mutation($userId: String!, $key: String!) {
    createPresignedPost(userId: $userId, key: $key) {
      url
      fields
    }
  }
`

export function sanitizeFileName (name) {
  let filename = name.replace(/[^A-Za-z-_.0-9]/g, '')
  return filename || Math.random().toString(36).substr(2, 9) // handle case where filename is all special characters, e.g., %%==^.pdf
}

export async function uploadDocument (file, filename, payload) {
  const formData = new window.FormData()
  for (const field in payload.fields) {
    formData.append(field, payload.fields[field])
  }
  formData.append('file', file, filename)

  return fetch(payload.url, {
    method: 'POST',
    body: formData
  }).then(() => {
    window.URL.revokeObjectURL(file.preview)
  })
}

function PostEditorComponent(props) {
  const client = useApolloClient()
  const classes = useStyles(props)

  const {
    getFormData,
    insertImage,
    loading,
    editorState,
    onChange,
    save,
    posts,
    users,
    renderToolbar
  } = props

  const addImage = (src) => {
    const nextEditorState = insertAtomic(editorState, Block.IMAGE, { src })
    onChange(nextEditorState)
  }

  const onUpload = async (file: File): Promise<void> => {
    const postId = posts[0].id
    const userId = users.data.users[0].id
    const { name } = file
    const filename = sanitizeFileName(name)
    const key = `static/${postId}/${filename}`
    const createPresignedPost = await getFormData({ key, userId })

    try {
      await uploadDocument(file, filename, createPresignedPost)
    } catch {
      return
    }
    const { data } = await client.mutate({
      mutation: CREATE_IMAGE,
      variables: {
        url: key,
        postId: postId,
        userId: userId
      }
    })

    addImage(`${AWS_BUCKET_URL}/${key}`)
  }

  const keyBindings = {
    [Command.EDITOR_SAVE]: (_, editorState) => {
      save()
      return HANDLED
    }
  }

  return (
    <>
      <Fade in={loading} unmountOnExit mountOnEnter>
        <LinearProgress className={classes.progress} />
      </Fade>
      <Dropzone
        className={classes.root}
        onUpload={onUpload}
        variant={DropzoneVariant.FULL_WIDTH}
      >
        {renderToolbar()}
        <div className={classes.editor}>
          <Editor
            editorState={editorState}
            onChange={onChange}
            keyBindings={keyBindings}
          />
        </div>
      </Dropzone>
    </>
  )
}

export default PostEditorComponent
