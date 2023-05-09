import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import Profile from './components/profile';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import SingleMovie from './components/SingleMovie';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MyNavBar />}>
      <Route index element={<Home />}/>
      <Route path='user-profile' element={<Profile />}/>
      <Route path='/movie/:movie_id' element={<SingleMovie />} />
    </Route>
  ))

function App() {

  return (
    // <div className="App">
    //   <MyNavBar />
    //   <ListStudents />

    // </div>
    <RouterProvider router={router} />
  )
}

export default App
