import React from 'react'
import createAsyncLoadingHighlighter from 'react-syntax-highlighter/dist/esm/async-syntax-highlighter'
import supportedLanguages from 'react-syntax-highlighter/dist/esm/languages/prism/supported-languages'
import { withStyles } from '@material-ui/styles'

const style = require('./theme.json')

const SyntaxHighlighter = createAsyncLoadingHighlighter({
  loader: () => import('refractor').then(module => module.default || module),
  noAsyncLoadingLanguages: true,
  supportedLanguages
})

class CodeSnippet extends React.Component {
  render () {
    const { classes, users } = this.props
    const user = users?.data?.users[0]
    const projectId = (user?.projects?.length && user.projects[0].id) || ''
    const code = [
      `curl 'https://api.contentkit.co/graphql' \\`,
      `-H 'authorization: Bearer ${user?.secret || ''}' \\`,
      `-H 'content-type: application/json' \\`,
      `--data-binary @- << EOF`,
      `{`,
      `  "variables": {`,
      `    "id": "projectId"`,
      `  },`,
      `  "query": "query($id: String!) { project(id: $id) { name } }"`,
      `}`,
      `EOF`
    ].join('\n')
    return (
      <div className={classes.root}>
        <SyntaxHighlighter
          language={'typescript'}
          showLineNumbers
          codeTagProps={{
            style: {
              fontFamily: 'Roboto Mono, Consolas, Menlo, Monaco, \'Andale Mono WT\', \'Andale Mono\', \'Lucida Console\', \'Lucida Sans Typewriter\', \'DejaVu Sans Mono\', \'Bitstream Vera Sans Mono\', \'Liberation Mono\', \'Nimbus Mono L\', \'Courier New\', Courier, monospace',
              fontSize: '14px',
              lineHeight: '1.574',
              direction: 'ltr',
              textAlign: 'left',
              whiteSpace: 'pre',
              wordSpacing: 'normal',
              wordBreak: 'normal',
              MozTabSize: '2',
              OTabSize: '2',
              tabSize: '2',
              WebkitHyphens: 'none',
              MozHyphens: 'none',
              msHyphens: 'none',
              hyphens: 'none',
              background: 'none',
              color: '#24DA8D'
            }
          }}
          lineNumberContainerStyle={{
            color: '#8FA6B2',
            float: 'left',
            opacity: 0.5,
            paddingRight: 20,
            textAlign: 'right'
          }}
          style={style}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    marginBottom: 16,
    background: '#2D3748',
    borderRadius: 6,
    boxShadow: '0px 1px 3px rgba(0,0,0,0.25)'
  }
})

export default withStyles(styles)(CodeSnippet)
