import './App.css'
import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./components/HomePage.jsx";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
