import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context';
import { useNavigate } from 'react-router';

export const HomePage = () => {
    const { userData } = useContext(AuthContext);
    const navigate = useNavigate();
  
    useEffect(() => {
  
      if (userData.rol_nombre === 'Cliente') {
        navigate('/catalogo');
      } else if (userData.rol_nombre === 'Operador') {
        navigate('/ordenes');
      } else {
        navigate('/403');
      }
    }, [userData]);
  
    return <></>;
};