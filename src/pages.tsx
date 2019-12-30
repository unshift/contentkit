import React from 'react'
import Fallback from './components/Fallback'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#f4f9fd',
  position: 'absolute',
  padding: '40vh',
  boxSizing: 'border-box',
  top: 0,
  zIndex: 0,
  pointerEvents: 'none'
}

export const LoadingOverlay = ({ loading, children }) => (
  <React.Fragment>
    <div className={loading ? '' : 'fadeIn'}>
      {children}
    </div>
    <div style={{ ...styles }} className={loading ? '' : 'fadeOut'}>
      <CircularProgress />
    </div>
  </React.Fragment>
)

export const Dashboard = React.lazy(
  () => import('./containers/Dashboard')
)

export const SignIn = React.lazy(
  () => import('./containers/Login')
)

export const PostEditor = React.lazy(() => import('./containers/PostEditor'))

export const Projects = React.lazy(() => import('./containers/Projects'))

export const Profile = React.lazy(() => import('./containers/Profile'))

export const Playground = React.lazy(() => import('./containers/Playground'))

export default [{
  component: Dashboard,
  path: '/',
  exact: true
}, {
  component: Profile,
  path: '/profile',
  exact: true
}, {
  component: SignIn,
  path: '/login',
  exact: true
}, {
  component: PostEditor,
  path: '/posts/:id',
  exact: true
}, {
  component: Projects,
  path: '/projects',
  exact: true
}, {
  component: Fallback,
  path: '/fallback',
  exact: true
}, {
  component: Playground,
  path: '/playground',
  exact: true
}]
