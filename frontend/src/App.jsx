import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/HomePage.jsx";
import CreerPortemonnaie from "./components/portemonnaies/CreatePortemonnaie.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portemonnaies/nouveau" element={<CreerPortemonnaie />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
