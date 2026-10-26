import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/HomePage.jsx";
import CreerPortemonnaie from "./components/portemonnaies/CreatePortemonnaie.jsx";
import CreerCompte from "./components/comptes/CreateCompte.jsx";
import Connexion from "./components/auth/Connexion.jsx";
import Navbar from "./components/Navbar.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import PortemonnaiesList from "./components/portemonnaies/PortemonnaiesList.jsx";
import PortemonnaieDetail from "./components/portemonnaies/PortemonnaieDetail.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/comptes/nouveau" element={<CreerCompte />} />
            <Route path="/portemonnaies" element={<PortemonnaiesList />} />
            <Route path="/portemonnaies/nouveau" element={<CreerPortemonnaie />} />
            <Route path="/portemonnaies/:id" element={<PortemonnaieDetail />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
