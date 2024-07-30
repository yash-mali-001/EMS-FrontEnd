import './App.css';
import Header from './pages/header/header';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/nomatch/nomatch';
import { Route ,Routes } from 'react-router-dom';
import PostUser from './pages/employee/PostUser';
import UpdateUser from './pages/employee/UpdateUser';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/employee' element={<PostUser/>}/>
      <Route path='*' element={<NoMatch/>}/>
      <Route path='/employee/:id' element={<UpdateUser/>}/>
    </Routes>
   
    </>
  )
}

export default App;
