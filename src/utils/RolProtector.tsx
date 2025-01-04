import { Navigate, useLocation, Outlet } from 'react-router';
import { useContext } from 'react';
import { match } from 'path-to-regexp';

import { AuthContext } from '../context';
import { roleRoutes } from './rolRoutes';

const RoleProtector = () => {
    const { userData } = useContext(AuthContext);
    const location = useLocation();

    if (!userData?.rol_nombre) {
        return <Navigate to="/login" replace />;
    }    

    const allowedRoutes = roleRoutes[userData.rol_nombre] || [];
    const isAllowed = allowedRoutes.some((route: string) => {
        const matcher = match(route, { decode: decodeURIComponent });
        return matcher(location.pathname);
    });

    if (!isAllowed) {
        return <Navigate to="/403" replace />;
    }

    return <Outlet />
};

export default RoleProtector;
