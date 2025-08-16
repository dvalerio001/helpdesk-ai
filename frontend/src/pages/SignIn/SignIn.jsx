import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signin } from "../../api/auth.js";
import "./SignIn.css";

function SignIn({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await signin({ email: email.trim(), password });
      localStorage.setItem("token", data.token);
      onAuth(data.user);
      nav("/snippets", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <div className="container">
        <div className="card auth__card">
          <h2 className="auth__title">Sign in</h2>
          <form className="auth__form" onSubmit={handleSubmit}>
            <label className="auth__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="auth__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label className="auth__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="auth__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />

            <div className="auth__actions">
              <button className="button" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </div>

            {err && <p className="auth__error">{err}</p>}
            <p className="auth__hint">
              No account? <Link to="/signup">Create one</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
