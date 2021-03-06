import React from 'react'
import {
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    '&:hover $notchedOutline, &$focused $notchedOutline': {
      borderColor: '#e2e8f0'
    }
  },
  notchedOutline: {
    borderColor: '#e2e8f0'
  },
  formLabelRoot: {
    color: '#fff',
    '&$focused': {
      color: '#fff'
    }
  },
  focused: {}
}))

function FormInput (props) {
  const classes = useStyles(props)
  const { fullWidth, label, className, helperText, ...rest } = props
  return (
    <TextField
      variant='outlined'
      margin='dense'
      label={label}
      fullWidth={fullWidth}
      helperText={helperText}
      InputLabelProps={{
        classes: {
          root: classes.formLabelRoot,
          focused: classes.focused
        }
      }}
      InputProps={{
        classes: {
          root: classes.root,
          notchedOutline: classes.notchedOutline
        }
      }}
      {...rest}
    />
  )
}

FormInput.defaultProps = {
  fullWidth: true
}

export default FormInput
