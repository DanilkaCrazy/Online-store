import React from 'react';
import RootLayout from './components/layout/RootLayout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { LightModeProvider } from './components/hooks/LightModeProvider';
import './App.css';
import { AccountProvider } from './components/hooks/AccountProvider';
import { BooksProvider } from './components/hooks/BooksProvider';
import { BasketProvider } from './components/hooks/BasketProvider';

function App() {
  return (
    <>
      <LightModeProvider>
        <AccountProvider>
          <Header/>
          <BooksProvider>
            <BasketProvider>
              <div className='main'>
                <RootLayout/>
              </div>
            </BasketProvider>
          </BooksProvider>
          <Footer/>
        </AccountProvider>
      </LightModeProvider>
    </>
  );
}

export default App;
