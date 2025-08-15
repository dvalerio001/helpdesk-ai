import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Snippets from "./pages/Snippets/Snippets.jsx";



function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/snippets" element={<Snippets />} />

        </Routes>
      </main>
            <Footer />

    </div>
  );
}

export default App;