import "./App.css";
import Profile from "./pages/profile";
import SingleMovie from "./pages/SingleMovie";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MyNavBar from "./components/PageElements/Navbar";
import Search from "./pages/Search";
import { AuthGuard } from "./components/Auth0/AuthGuard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MyNavBar />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<AuthGuard component={Profile} />} />
        <Route path="/movie/:movie_id" element={<SingleMovie />} />
        <Route path="/search/:search_term" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
