import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../components/pages/LoginPage/LoginPage';
import PrivateRoute from './PrivateRoute';
import HomePage from '../components/pages/HomePage';
import AdminHomePage from '../components/pages/AdminHomePage';
import LandingPage from "../components/pages/landingPage/LandingPage";
import UserListPage from '../components/pages/userListPage/UserListPage';
import Unauthorized from "../components/pages/Unauthorized";
import UserEntryListPage from "../components/pages/UserEntryListPage";

/**
 * Router component renders a route switch with all available pages
 */

const Router = () => {
  //const { checkRole } = useContext(ActiveUserContext);
  /** navigate to different "home"-locations depending on Role the user have */

  return (
    <Routes>
            <Route path={'/home'}  element={
                <PrivateRoute authorities={["MY_LIST_ENTRY_READ"]} element={<HomePage/>} />
            }/>
            <Route path={'/adminhome'}  element={
                <PrivateRoute authorities={["USER_READ", "USER_MODIFY", "USER_DELETE", "USER_CREATE"]} element={<AdminHomePage/>} />
            }/>
        <Route path={'/mylist'}  element={
            <PrivateRoute authorities={["MY_LIST_ENTRY_READ"]} element={<UserEntryListPage/>} />
        }/>

      <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/'} element={<LandingPage/>}/>

      <Route
        path={'/users'}
        element={
          <PrivateRoute authorities={["USER_READ", "USER_MODIFY", "USER_DELETE", "USER_CREATE"]} element={<UserListPage/>} />
        }
      />
      <Route
        path='/users/:userId'
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />

      <Route
        path='/profile'
        element={
          <PrivateRoute
            authorities={[]}
            element={<div>nothing here</div>}
          ></PrivateRoute>
        }
      />
        <Route
            path='/unauthorized'
            element={
                <PrivateRoute
                    authorities={[]}
                    element={<Unauthorized/>}
                ></PrivateRoute>
            }
        />

      <Route path='*' element={<div>Not Found</div>} />
    </Routes>
  );
};

export default Router;
