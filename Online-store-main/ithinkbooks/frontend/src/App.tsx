import React from 'react';
import RootLayout from './components/layout/RootLayout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { LightModeProvider } from './components/hooks/LightModeProvider';
import './App.css';
import { AccountProvider } from './components/hooks/AccountProvider';
import { BooksProvider } from './components/hooks/BooksProvider';

function App() {
  return (
    <>
      <LightModeProvider>
        <Header/>
        <BooksProvider>
          <AccountProvider>
            <div className='main'>
              <RootLayout/>
            </div>
          </AccountProvider>
        </BooksProvider>
        <Footer/>
      </LightModeProvider>
    </>
  );
}

export default App;
