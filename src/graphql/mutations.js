import gql from 'graphql-tag'

export const DELETE_POST = gql`
  mutation ($id: String!) {
    delete_posts(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`
// project id el3lszcis8qs3i1961tzp1wva
export const CREATE_POST = gql`
  mutation createPost($userId: String!, $title: String!, $projectId: String!) {
    insert_posts(objects: { user_id: $userId, title: $title, project_id: $projectId }) {
      returning {
        id
        created_at
        published_at
        title
        slug
        status
        excerpt
        project {
          id
          name
        }
        posts_tags {
          tag {
            id
            name
          }
        }
      }
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation ($userId: String!, $name: String!) {
    insert_projects(objects: {
      name: $name,
      user_id: $userId
    }) {
      returning {
        name
        id
      }
    }
  }
`

// export const UPDATE_DOCUMENT = gql`
//   mutation (
//     $id: ID!
//     $raw: JSON!
//     $encodedHtml: String!
//   ) {
//     updateDocument(
//       id: $id
//       raw: $raw
//       encodedHtml: $encodedHtml
//     ) {
//       id
//       raw
//       encodedHtml
//       versions {
//         id
//         raw
//         createdAt
//       }
//     }
//   }
// `

// export const DELETE_VERSION = gql`
//   mutation ($id: ID!) {
//     deleteVersion(id: $id) {
//       id
//     }
//   }
// `

export const UPDATE_DOCUMENT = gql`
  mutation (
    $id: String!
    $raw: jsonb!
    $encodedHtml: String!
  ) {
    update_posts (
      _set: { raw: $raw, encoded_html: $encodedHtml },
      where: { id: { _eq: $id } }
    ) {
      returning {
        id
        created_at
        images {
          id
          url
        }
        raw
        encoded_html
        title
        slug
        status
        excerpt 
      }
    }
  }
`

export const UPDATE_POST = gql`
  mutation (
    $id: String!
    $title: String!
    $status: post_status!
    $publishedAt: String!
    $excerpt: String!
  ) {
    update_posts (
      _set: { title: $title, status: $status, published_at: $publishedAt, excerpt: $excerpt },
      where: { id: { _eq: $id } }
    ) {
      returning {
        id
        created_at
        images {
          id
          url
        }
        raw
        encoded_html
        title
        slug
        status
        excerpt 
      }
    }
  }
`

export const CREATE_IMAGE = gql`
  mutation ($url: String!, $postId: ID!) {
    insert_images (objects: { url: $url, postId: $postId }) {
      returning {
        id
        url
      }
    } 
  }
`

export const DELETE_IMAGE = gql`
  mutation ($id: ID!) {
    delete_images (where: { id: { _eq: $id } }) {
      returning {
        id
      }
    } 
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($id: String!, $name: String!, $email: String!) {
    update_users(where: { id: { _eq: $id } }, _set: { name: $name, email: $email }) {
      returning {
        id,
        email,
        name,
        secret
      }
    }
  }
`

export const GENERATE_TOKEN = gql`
  mutation {
    generateToken {
      id
      secret
    }
  }
`

export const GET_TOKEN = gql`
  mutation {
    getToken {
      token
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation ($id: String!, $name: String!, $userId: String!) {
    update_projects(where: { id: { _eq: $id } }, _set: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation ($id: String!) {
    delete_projects(where: { id: { _eq: $id } }) {
      returning { 
        id
      }
    }
  }
`

export const AUTHENTICATE_USER = gql`
  mutation(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`

export const SIGNUP_USER = gql`
  mutation(
    $email: String!,
    $password: String!,
  ) {
    register(
      email: $email,
      password: $password
    ) {
      token
    }
  }
`

export const DELETE_ORIGIN = gql`
  mutation ($id: String!) {
    delete_origins (where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

export const DELETE_TAG = gql`
  mutation ($id: String!) {
    delete_tags (where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

export const CREATE_ORIGIN = gql`
  mutation ($projectId: String!, $name: String!, $userId: String!) {
    insert_origins (
      objects: [{
        project_id: $projectId,
        name: $name,
        user_id: $userId
      }]
    ) {
      returning {
        name
        id
        project {
          id
        }
      }
    }
  }
`

export const CREATE_TAG = gql`
  mutation ($name: String, $projectId: String!, $postId: String!, $userId: String!) {
    insert_tags(objects: [{ user_id: $userId, name: $name, projectId: $projectId, postId: $postId }]) {
      returning {
        name
        id
        createdAt
        description
        slug
      }
    }
  }
`

export const DELETE_USER = gql`
  mutation {
    deleteUser {
      id
    }
  }
`
