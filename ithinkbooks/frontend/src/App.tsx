import React from 'react';
import RootLayout from './components/layout/RootLayout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { LightModeProvider } from './components/hooks/LightModeProvider';
import './App.css';

function App() {
  return (
    <>
      <LightModeProvider>
        <Header/>
        <div className='main'>
          <RootLayout/>
        </div>
        <Footer/>
      </LightModeProvider>
    </>
  );
}

export default App;
