import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UseRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';
import 'materialize-css';
import { Navbar } from './components/Navbar';
import { Loader } from './components/Loader';

const App = () => {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = UseRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
