import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Stub from './Stub';
import AnotherUser from '../user/AnotherUser';
import BookPage from '../books/BookPage';
import Main from '../collections/Main';
import Basket from '../user/Basket';
import FavoritiesList from '../user/FavoritiesList';
import History from '../user/History';
import RoadmapsList from '../user/RoadmapsList';
import ReviewsList from '../user/ReviewsList';
import QuizPage from '../roadmap/QuizPage';
import RoadmapPage from '../roadmap/Roadmap';
import ThemeCollection from '../collections/ThemeCollection';
import PersonalAccount from '../user/PersonalAccount';
import OrderForm from '../user/OrderForm';
import EditFrom from '../user/EditForm';
import LogInForm from '../user/LogInForm';
import SignUpForm from '../user/SignUpForm';
import Quiz from '../roadmap/Quiz';
import QuizTheme from '../roadmap/QuizTheme';
import QuizWarning from '../roadmap/QuizWarning';
import { useAccount } from '../hooks/AccountProvider';
import SearchedBooks from '../collections/SearchingBooks';
import OrderInfo from '../user/OrderInfo';

const RootLayout: React.FC<{}> = () => {
  const {account} = useAccount();

  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='roadmaps/:id' element={<RoadmapPage/>}/>
      <Route path='quiz' element={account.id < 0 ? <Navigate to='/log-in'/> : <QuizPage/>}>
        <Route path='theme' element={<QuizTheme/>}/>
        <Route path='questions' element={<Quiz/>}/>
        <Route path='warning' element={<QuizWarning/>}/>
      </Route>
      <Route path='account' element={account.id < 0 ? <Navigate to='/log-in'/> : <PersonalAccount/>}>
        <Route path='basket' element={<Basket/>}/>
        <Route path='favorities' element={<FavoritiesList/>}/>
        <Route path='history' element={<History/>}/>
        <Route path='roadmaps' element={<RoadmapsList/>}/>
        <Route path='reviews' element={<ReviewsList/>}/>
        <Route path='history/:id' element={<OrderInfo/>}/>
      </Route>
      <Route path='faq' element={<Stub pageName='Скоро здесь будет раздел, посвящённый вопросам и ответам'/>}/>
      <Route path='roadmap-help' element={<Stub pageName='Скоро здесь будет раздел с информацией о составлении роадмапов'/>}/>
      <Route path='payment' element={<Stub pageName='Скоро здесь будет раздел с ифнормацией об оплате и доставке'/>}/>
      <Route path='feedback' element={<Stub pageName='Скоро здесь будет раздел, посвящённый обратной связи'/>}/>
      {/*<Route path='user'>
        <Route path=':id' element={<AnotherUser/>}/>
      </Route>*/}
      <Route path='book'>
        <Route path=':id' element={<BookPage/>}/>
      </Route>
      <Route path='order'>
        <Route path=':id' element={account.id < 0 ? <Navigate to='/log-in'/> : <OrderForm/>}/>
      </Route>
      <Route path='editor' element={account.id < 0 ? <Navigate to='/log-in'/> :  <EditFrom/>}/>
      <Route path='log-in' element={<LogInForm/>}/>
      <Route path='sign-up' element={<SignUpForm/>}/>
      <Route path='/themes/:theme' element={<ThemeCollection/>}/>
      <Route path='search/:bookTitle' element={<SearchedBooks/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
};

export default RootLayout;
