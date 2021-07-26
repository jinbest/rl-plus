import React, { createContext, useState, useEffect, useContext } from 'react';
import { ReactNode } from 'react-google-login/node_modules/@types/react';
import { getToken } from '../service/helper'

type authcontextType = {
  user: boolean;
  login: () => void;
  logout: () => void;
}

const authContextDefalutVaule : authcontextType = {
  user: false,
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<authcontextType>(authContextDefalutVaule);

type Props = {
  children: ReactNode;
}

export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthWrapper = ({ children }: Props) => {
  const [user, setUser] = useState<boolean>(false);
  const login = ():void => {

  } 
  const logout = ():void => {

  }

  useEffect(() => {
    if(getToken()) return setUser(true);
  }, [])

  const value = {
    user,
    login,
    logout
  }

  return (
    <>
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default AuthWrapper