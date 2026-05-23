import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import NotFound from '../pages/NotFound'

function AppRoutes() {

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes