import React from 'react'
import ProjectModalContent from '../ProjectModalContent'
import PropTypes from 'prop-types'
import { Grid, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  PROJECT_QUERY
} from '../../graphql/queries'
import {
  CREATE_ORIGIN,
  DELETE_ORIGIN,
  useCreateOriginMutation,
  useDeleteOriginMutation
} from '../../graphql/mutations'

import Button from '../Button'

import { makeStyles } from '@material-ui/styles'
import { GraphQL } from '../../types'

const useStyles = makeStyles(theme => ({
  modal: {},
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
}))

type ProjectModalProps = {
  users: GraphQL.UserQueryResult,
  project: GraphQL.ProjectQueryResult,
  open: boolean,
  updateProject: () => void,
  handleDelete: () => void,
  handleClose: () => void
}

function ProjectModal (props) {
  const { 
    users,
    project,
    open,
    updateProject,
    handleDelete,
    handleClose,
    createOrigin,
    deleteOrigin
  } = props
  if (project.loading) return null

  const userId = users.data.users[0].id
  const projectId = project.data.projects[0].id
  const projectName = project.data.projects[0].name
  const classes = useStyles(props)

  const onChange = data => {
    const { client, project } = props
    return client.writeQuery({
      query: PROJECT_QUERY,
      data: {
        projects: [{
          ...project.data.projects[0],
          ...data
        }]
      },
      variables: project.variables
    })
  }

  const onSave = () => {
    handleClose()
    updateProject.mutate({ name: projectName, id: projectId, userId })
  }

  const onDelete = () => {
    handleClose()
    handleDelete({ id: projectId, userId })
  }
  
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.modal}
      fullWidth
      PaperProps={{
        square: true
      }}
    >
      <DialogTitle>{project?.data?.projects[0]?.name}</DialogTitle>
      <DialogContent>
        <ProjectModalContent
          onChange={onChange}
          handleSave={onSave}
          handleDelete={onDelete}
          handleClose={handleClose}
          project={project}
          deleteOrigin={deleteOrigin}
          createOrigin={createOrigin}
          users={users}
        />
      </DialogContent>
      <DialogActions>
        <Grid container className={classes.actions}>
          <Grid item xs={6}>
            <Button key={'delete'} onClick={handleDelete} color='danger'>Delete</Button>
          </Grid>
          <Grid item xs={6} justify='flex-end' style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button key={'cancel'} onClick={handleClose} style={{ marginRight: 10 }}>Cancel</Button>
            <Button key={'update'} onClick={onSave}>Update</Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  )
}

ProjectModal.propTypes = {
  open: PropTypes.bool.isRequired,
  updateProject: PropTypes.object,
  handleDelete: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}


function ProjectsModalWithData (props) {
  if (!props.open) {
    return false
  }
  const project = useQuery(PROJECT_QUERY, { variables: { id: props.activeProject }, skip: !props.activeProject })
  const createOrigin = useCreateOriginMutation()
  const deleteOrigin = useDeleteOriginMutation()

  return (
    <ProjectModal {...props} project={project} createOrigin={createOrigin} deleteOrigin={deleteOrigin} />
  )
}

export default ProjectsModalWithData
