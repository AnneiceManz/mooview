import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import Profile from "./components/profile";
import SingleMovie from "./components/SingleMovie";
import { Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyNavBar />}>
        <Route index element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:movie_id" element={<SingleMovie />} />
      </Route>
    </Routes>
  );
}

export default App;
