import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/HomePage.jsx";
import CreerPortemonnaie from "./components/portemonnaies/CreatePortemonnaie.jsx";
import CreerCompte from "./components/comptes/CreateCompte.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portemonnaies/nouveau" element={<CreerPortemonnaie />} />
          <Route path="/comptes/nouveau" element={<CreerCompte />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
