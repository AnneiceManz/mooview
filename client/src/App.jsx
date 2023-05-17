import "./App.css";
import Profile from "./pages/profile";
import SingleMovie from "./pages/SingleMovie";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyNavBar from "./components/Navbar";
import Search from "./pages/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyNavBar />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:movie_id" element={<SingleMovie />} />
        <Route path="/search/:search_term" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
