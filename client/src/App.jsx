import "./App.css";
import Profile from "./pages/profile";
import SingleMovie from "./pages/SingleMovie";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyNavBar from "./components/Navbar";
import SearchResults from "./components/Search/SearchResults";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyNavBar />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/movie/:movie_id" element={<SingleMovie />} />
        <Route path='/search/results' element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
