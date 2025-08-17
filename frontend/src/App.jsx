import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Snippets from "./pages/Snippets/Snippets.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { getMe } from "./api/auth.js";

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecked(true);
      return;
    }
    getMe(token)
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
      })
      .finally(() => setAuthChecked(true));
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <main className="app__main">
        {authChecked && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/snippets"
              element={
                <ProtectedRoute>
                  <Snippets />
                </ProtectedRoute>
              }
            />
            <Route path="/signin" element={<SignIn onAuth={setUser} />} />
            <Route path="/signup" element={<SignUp onAuth={setUser} />} />
            <Route
              path="*"
              element={
                <div style={{ padding: "2rem" }}>404 — Page not found</div>
              }
            />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
