import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';

import { AuthContext } from '../context';

const RouteProtector = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return isAuthenticated ? <Outlet /> : <Navigate to="/401" replace />;
};

export default RouteProtector