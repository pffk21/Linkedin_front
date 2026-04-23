import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';

import { Home } from './Pages/Home';
import { Network } from './Pages/Network';
import { Vacancies } from './Pages/Vacancies';
import { Messages } from './Pages/Messages';
import { Notification } from './Pages/Notification';
import { MyProfilePortfolio } from './Pages/MyProfilePortfolio';

import { Registration } from './Modals/Registration';
import { Verification } from './Modals/Verification';
import { Entrance } from './Modals/Entrance';
import { EntranceVerification } from './Modals/EntranceVerification';

import { MainPages } from './MainPages';
import { LandingPage } from './LandingPage';

import AppContext from './AppContext';
import './i18n'; 
import Base64 from './Base64';
import RequireAuth from './RequireAuth';

function decodeJwtPayload(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const decoded = atob(payloadBase64);
    return JSON.parse(decoded);
  } catch (e) {
    console.error('JWT decoding error:', e);
    return null;
  }
}

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {

      const decoded = decodeJwtPayload(token);
      setUser(decoded);
    } else {
      setUser(null);
    }
  }, [token]);

  const backUrl = "https://localhost:7294";

  
  const request = (url, conf) => new Promise((resolve, reject) => {
    if (url.startsWith('/')) {
      url = backUrl + url;

      if (token) {
        conf = conf || {};
        conf.headers = conf.headers || {};
        if (!conf.headers['Authorization']) {
          conf.headers['Authorization'] = 'Bearer ' + token;
        }
      }
    }

    fetch(url, conf)
      .then(r => r.json())
      .then(j => {
        if (j.status?.isOk) { 
          resolve(j.data);
          return;

        } else if (j.token && j.user) { 
          resolve(j); 
          return; 
        }
        
        reject(j);
      })
      .catch(err => reject({ message: 'Network error', error: err }));
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContext.Provider value={{ request, backUrl, user, setToken }}>
        <Router>
          <Routes>
            <Route path="/Linkidin" element={<LandingPage />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/entrance" element={<Entrance />} />
            <Route path="/entranceVerification" element={<EntranceVerification />} />

            <Route path="/" element={<RequireAuth><MainPages /></RequireAuth>}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="network" element={<Network />} />
              <Route path="vacancies" element={<Vacancies />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notification" element={<Notification />} />
              <Route path="myProfilePortfolio" element={<MyProfilePortfolio />} />
            </Route>
          </Routes>
        </Router>
      </AppContext.Provider>
    </Suspense>
  );
}

export default App;
