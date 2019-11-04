import { PROJECT_QUERY } from '../../graphql/queries'
import {
  DELETE_ORIGIN,
  CREATE_ORIGIN
} from '../../graphql/mutations'
import { genKey } from '../../lib/util'
import withMutation from '../../lib/withMutation'
import withQuery from '../../lib/withQuery'

const mutations = [
  withQuery({
    name: 'project',
    options: ({ ownProps }) => ({
      name: 'project',
      query: PROJECT_QUERY,
      variables: {
        id: ownProps.activeProject
      },
      skip: !ownProps.activeProject
    })
  }),
  withMutation({
    name: 'createOrigin',
    options: {
      mutation: CREATE_ORIGIN
    },
    mutate: ({ variables, ownProps }) => ({
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        insert_origins: {
          __typename: 'origins_mutation_response',
          returning: [{
            __typename: 'Origin',
            id: genKey(),
            name: variables.name,
            project: {
              __typename: 'Project',
              id: variables.projectId
            }
          }]
        }
      },
      update: (store, { data: { insert_origins } }) => {
        const query = store.readQuery({
          query: PROJECT_QUERY,
          variables: ownProps.project.variables
        })
        const { projects } = query
        const [project] = projects
        const origins = [...project.origins].concat(insert_origins.returning)
        store.writeQuery({
          query: PROJECT_QUERY,
          data: {
            projects: [{
              ...project,
              origins
            }]
          },
          variables: query.variables
        })
      }
    })
  }),
  withMutation({
    name: 'deleteOrigin',
    options: {
      mutation: DELETE_ORIGIN
    },
    mutate: ({ ownProps, variables }) => ({
      variables,
      optimisticResponse: {
        __typename: 'Mutation',
        deleteOrigin: {
          __typename: 'Origin',
          id: variables.id
        }
      },
      update: (store, { data: { deleteOrigin } }) => {
        const { id } = deleteOrigin
        const { project } = ownProps
        const origins = [...project.data.project.origins]
          .filter(origin => origin.id !== id)
        store.writeQuery({
          query: PROJECT_QUERY,
          data: {
            project: {
              ...project.data.project,
              origins
            }
          },
          variables: project.variables
        })
      }
    })
  })
]

export default mutations
