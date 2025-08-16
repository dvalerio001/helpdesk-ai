import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup, signin } from "../../api/auth.js";
import "./SignUp.css";

function SignUp({ onAuth }) {
  const [name, setName] = useState("");
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
      await signup({ name: name.trim(), email: email.trim(), password });
      // auto sign-in after signup
      const data = await signin({ email: email.trim(), password });
      localStorage.setItem("token", data.token);
      onAuth(data.user);
      nav("/snippets", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Create account</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <label className="auth__label" htmlFor="name">Name</label>
        <input
          id="name"
          className="auth__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={40}
          required
        />

        <label className="auth__label" htmlFor="email">Email</label>
        <input
          id="email"
          className="auth__input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="auth__label" htmlFor="password">Password</label>
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
            {loading ? "Creating…" : "Create account"}
          </button>
        </div>

        {err && <p className="auth__error">{err}</p>}
        <p className="auth__hint">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </form>
    </section>
  );
}

export default SignUp;