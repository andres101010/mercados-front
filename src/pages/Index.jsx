import Sidebar from "../component/Sidebar"
import { Outlet } from 'react-router-dom'

const Index = () => {
  return (
    <div>
        <Sidebar>
         <Outlet />
        </Sidebar>
    </div>
  )
}

export default Index