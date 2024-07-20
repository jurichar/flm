import { BrowserRouter as Router, Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { NavbarSimple } from './components/Navbar/Navbar';
import { Suspense, useState } from 'react';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import './i18n';
import ModulePage from './pages/ModulePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userModules] = useState([
    'Calculator',
    'Estimate',
    'Estimate_Generator',
    'Invoice_Generator',
    'Invoice',
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const hasAccess = (moduleName) => {
    return userModules.includes(moduleName);
  };

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetch('http://localhost:8000/test/')
  //     .then(res => res.json())
  //     .then(data => setData(data.data));
  // })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <div className="p-4">
          {isLoggedIn ? <NavbarSimple onLogout={handleLogout} /> : null}
          <Routes>
            <Route
              element={<LoginPage onLogin={handleLogin} />}
              path="/login"
            />
            <Route
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <HomePage hasAccess={hasAccess} userModules={userModules} />
                </ProtectedRoute>
              }
              path="/"
            />
            <Route
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <ModulePage hasAccess={hasAccess} />
                </ProtectedRoute>
              }
              path="/module/:moduleName"
            />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
};

export default App;
