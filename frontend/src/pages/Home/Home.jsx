import { useState } from "react";
import { generateSolution } from "../../api/ai.js";
import { RESULT_EMPTY } from "../../utils/constants.js";
import Result from "../../components/Result/Result.jsx";
import "./Home.css";

function Home() {
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(RESULT_EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(RESULT_EMPTY);

    try {
      const data = await generateSolution(issue.trim());
      setResult({
        steps: Array.isArray(data.steps) ? data.steps : [],
        commands: Array.isArray(data.commands) ? data.commands : [],
        risks: Array.isArray(data.risks) ? data.risks : [],
        rationale: typeof data.rationale === "string" ? data.rationale : "",
      });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="home">
      <h2 className="home__title">Generator</h2>
      <p className="home__hint">
        Paste a brief customer issue. The app will return structured steps, commands, and risks.
      </p>

      <form className="home__form" onSubmit={handleSubmit}>
        <label className="home__label" htmlFor="issue">Issue</label>
        <textarea
          id="issue"
          className="home__textarea"
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="Example: User cannot connect to VPN on Windows 11..."
          rows={6}
          required
        />
        <div className="home__actions">
          <button className="button" type="submit" disabled={!issue.trim() || loading}>
            {loading ? "Generating…" : "Generate"}
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => { setIssue(""); setResult(RESULT_EMPTY); setError(""); }}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>

      <Result data={result} loading={loading} error={error} />
    </section>
  );
}

export default Home;