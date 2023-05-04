import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListMovies from './components/ListMovies'
import ListTV from './components/ListTV'
import Profile from './components/profile';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MyNavBar />}>
      <Route index element={<Home />}/>
      <Route path='user-profile' element={<Profile />}/>
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
