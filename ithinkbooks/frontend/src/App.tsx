import React, { useEffect } from 'react';
import RootLayout from './components/layout/RootLayout';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { LightModeProvider } from './components/hooks/LightModeProvider';
import './App.css';
import { AccountProvider } from './components/hooks/AccountProvider';
import { BooksProvider } from './components/hooks/BooksProvider';
import { BasketProvider } from './components/hooks/BasketProvider';
import { OrdersProvider } from './components/hooks/OrderProvider';
import { QuizProvider } from './components/hooks/QuizProvider';
import { FavoriteProvider } from './components/hooks/FavoriteProvider';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  
  return (
    <>
      <LightModeProvider>
        <AccountProvider>
          <BooksProvider>
            <Header/>
              <BasketProvider>
                <OrdersProvider>
                  <QuizProvider>
                    <FavoriteProvider>
                      <div className='main'>
                        <RootLayout/>
                      </div>
                    </FavoriteProvider>
                  </QuizProvider>
                </OrdersProvider>
              </BasketProvider>
          </BooksProvider>
          <Footer/>
        </AccountProvider>
      </LightModeProvider>
    </>
  );
}

export default App;
