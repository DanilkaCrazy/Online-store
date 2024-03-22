import React, { useReducer } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Stub from './Stub';
import AnotherUser from '../user/AnotherUser';
import Book from '../books/Book';
import Main from '../collections/Main';
import themes from '../mock/themes.json';
import Basket from '../user/Basket';
import FavoritiesList from '../user/FavoritiesList';
import History from '../user/History';
import RoadmapsList from '../user/RoadmapsList';
import ReviewsList from '../user/ReviewsList';
import Quiz from '../roadmap/Quiz';
import Roadmap from '../roadmap/Roadmap';
import ThemeCollection from '../collections/ThemeCollection';
import PersonalAccount from '../user/PersonalAccount';

const RootLayout: React.FC<{}> = () => {
  const [isCompleted, setIsCompleted] = useReducer((value) => !value, false);

  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='roadmap' element={isCompleted ? <Roadmap onExit={setIsCompleted}/> : <Navigate to='/quiz'/>}/>
      <Route path='quiz' element={<Quiz onComplete={setIsCompleted}/>}/>
      <Route path='account' element={<PersonalAccount/>}>
        <Route path='basket' element={<Basket/>}/>
        <Route path='favorities' element={<FavoritiesList/>}/>
        <Route path='history' element={<History/>}/>
        <Route path='roadmaps' element={<RoadmapsList/>}/>
        <Route path='reviews' element={<ReviewsList/>}/>
      </Route>
      <Route path='faq' element={<Stub pageName='FAQ'/>}/>
      <Route path='roadmap-help' element={<Stub pageName='Roadmap help'/>}/>
      <Route path='payment' element={<Stub pageName='Payment'/>}/>
      <Route path='feedback' element={<Stub pageName='Feedback'/>}/>
      <Route path='user'>
        <Route path=':id' element={<AnotherUser/>}/>
      </Route>
      <Route path='book'>
        <Route path=':id' element={<Book/>}/>
      </Route>
      {themes.map((theme, i) => <Route key={i} path={theme.title} element={<ThemeCollection theme={theme}/>}/>)}
      <Route path='*' element={<Stub pageName='Error'/>}/>
    </Routes>
  );
};

export default RootLayout;
