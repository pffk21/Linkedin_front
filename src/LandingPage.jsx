
import {Outlet } from 'react-router-dom';

import {Landing} from './Pages/Landing';

import {Header} from './Components/Header';
import {Footer} from './Components/Footer';

export function LandingPage() {
  return (
    <div className="app-layout">
        <Header/>

        <main>
            <Landing>

                <Outlet/>

            </Landing>
        </main>

        <Footer shadow/>
    </div>
    
  );
}