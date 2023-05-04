import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavBar from './components/Navbar'
import ListStudents from './components/ListStudents'
import Profile from './components/profile';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MyNavBar />}>
      <Route index element={<ListStudents />}/>
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
