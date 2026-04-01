import { ViteReactSSG } from 'vite-react-ssg'
import App from './App.jsx'
import Home from './pages/home/Home.jsx'
import ProjectDetail from './pages/projects/ProjectDetail.jsx'
import './i18n'
import './index.css'

const routes = [
  {
    path: '/',
    element: <App />,
    src: 'src/App.jsx',
    children: [
      { index: true, element: <Home /> },
      {
        path: 'projects/:projectId',
        element: <ProjectDetail />,
        getStaticPaths: () => ['projects/terrafix']
      }
    ]
  }
]

export const createRoot = ViteReactSSG(
  { routes },
  ({ router, routes, isClient, initialState }) => {
    // Client side logic here
  }
)
