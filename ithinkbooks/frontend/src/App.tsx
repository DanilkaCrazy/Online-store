import React from 'react';
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

function App() {
  return (
    <>
      <LightModeProvider>
        <AccountProvider>
          <BooksProvider>
            <Header/>
              <BasketProvider>
                <OrdersProvider>
                  <QuizProvider>
                    <div className='main'>
                      <RootLayout/>
                    </div>
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
