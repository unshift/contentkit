// @flow
import React from 'react'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import ClipboardIcon from '@material-ui/icons/FileCopy'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import RefreshIcon from '@material-ui/icons/Autorenew'

const ApiKeyInput = (props: any) => {
  const {
    onCopy,
    setRef,
    generateToken,
    secret,
    classes,
    id
  } = props
  return (
    <FormControl fullWidth margin='normal'>
      <Input
        className={classes.input}
        disableUnderline
        id='api-key'
        value={secret || ''}
        inputRef={setRef}
        placeholder={'API key'}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              className={classes.iconButton}
              onClick={onCopy}
              onMouseDown={onCopy}
            >
              <ClipboardIcon />
            </IconButton>
            <IconButton
              className={classes.iconButton}
              onClick={() => generateToken({ id })}>
              <RefreshIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default ApiKeyInput
