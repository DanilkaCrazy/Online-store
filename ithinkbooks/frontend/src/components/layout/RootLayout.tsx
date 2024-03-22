import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Stub from './Stub';
import AnotherUser from '../user/AnotherUser';
import Book from '../books/Book';
import Main from '../collections/Main';
import themes from '../mock/themes.json';

const RootLayout: React.FC<{}> = () => (
  <Routes>
    <Route path='/' element={<Main/>}/>
    <Route path='roadmap' element={<Stub pageName='Roadmap'/>}/>
    <Route path='account' element={<Stub pageName='Account'/>}>
      <Route path='basket' element={<Stub pageName='Basket'/>}/>
      <Route path='favorities' element={<Stub pageName='Favorities'/>}/>
      <Route path='history' element={<Stub pageName='History'/>}/>
      <Route path='roadmaps' element={<Stub pageName='Roadmaps'/>}/>
      <Route path='reviews' element={<Stub pageName='Reviews'/>}/>
    </Route>
    <Route path='faq' element={<Stub pageName='FAQ'/>}>
      <Route path='roadmap-help' element={<Stub pageName='Roadmap help'/>}/>
      <Route path='payment' element={<Stub pageName='Payment'/>}/>
      <Route path='feedback' element={<Stub pageName='Feedback'/>}/>
    </Route>
    <Route path='user'>
      <Route path=':id' element={<AnotherUser/>}/>
    </Route>
    <Route path='book'>
      <Route path=':id' element={<Book/>}/>
    </Route>
    <Route path='theme'>
      {themes.map((theme, i) => <Route path={theme.title} element={<Stub pageName={theme.name}/>}/>)}
    </Route>
    <Route path='*' element={<Stub pageName='Error'/>}/>
  </Routes>
);

export default RootLayout;
