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
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadBase64 = parts[1];
    const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT decoding error:', e);
    return null;
  }
}

// function decodeJwtPayload(token) {
//   try {
//     const payloadBase64 = token.split('.')[1];
//     const base64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
//     const decoded = atob(payloadBase64);
//     return JSON.parse(decoded);
//   } catch (e) {
//     console.error('JWT decoding error:', e);
//     return null;
//   }
// }

function App() {
  const [token, setTokenState] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const backUrl = "https://localhost:7294";

  const setToken = (newToken) =>{
    setTokenState(newToken);
    if(newToken){
      localStorage.setItem('authToken', newToken)
    } else {
      localStorage.removeItem('authToken')
    }
  }

  useEffect(() => {
    if (token) {
      const decoded = decodeJwtPayload(token);
      if (decoded && decoded.exp && decoded.exp < Date.now() / 1000) {
        console.warn("Токен истек");
        logout();
        return;
      }
      setUser(decoded);

      fetch(`${backUrl}/api/user/info`, {
        headers: { 
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.ok ? r.json() : Promise.reject('Failed to load profile'))
      .then(j => {
        const actualData = j.data || j.Data;
        if (actualData) {
          setUser(prev => ({ 
            ...prev, 
            avatarPhoto: actualData.AvatarPhoto || actualData.avatarPhoto,
            aboitSection: actualData.AboitSection || actualData.aboitSection
          }));
        }
      })
      .catch(err => console.error("Ошибка при подгрузке аватара в App.js:", err));

    } else {
      setUser(null);
    }
  }, [token]);
  
  
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
    

    conf = conf || {};
    conf.headers = conf.headers || {};
    if (!conf.headers['Content-Type']) {
        conf.headers['Content-Type'] = 'application/json';
    }

    fetch(url, conf)
      .then(r => {
          if (r.status === 401) {
              logout();
              reject({ message: 'Unauthorized, token expired or invalid.', status: 401 });
              return;
          }
          return r.json();
      })
      .then(j => {
        const isActuallyOk = j.status?.isOk || j.status?.isOK || j.status?.code === 200;

        if (isActuallyOk) {
          resolve(j); 
          return;
        } 
        

        if (j.token && j.user) {
          setToken(j.token);
          resolve(j);
          return;
        }
        

        reject(j);
      })
  });

  const logout = () => {
    setToken(null);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AppContext.Provider value={{ request, backUrl, user,token, setToken, logout }}>
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
