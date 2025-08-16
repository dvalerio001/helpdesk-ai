import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateSolution } from "../../api/ai.js";
import { RESULT_EMPTY } from "../../utils/constants.js";
import { createSnippet } from "../../api/backend.js";
import buildSnippetFromResult from "../../utils/formatSnippet.js";
import Result from "../../components/Result/Result.jsx";
import "./Home.css";

function Home() {
  const [issue, setIssue] = useState("");
  const [result, setResult] = useState(RESULT_EMPTY);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [flash, setFlash] = useState("");
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setFlash("");
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

  const canSave =
    (result.steps?.length || result.commands?.length || result.risks?.length) &&
    !loading &&
    !saving;

  async function handleSave() {
    setError("");
    setFlash("");
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/signin");
      return;
    }
    setSaving(true);
    try {
      const { title, body, tags } = buildSnippetFromResult(issue, result);
      await createSnippet({ title, body, tags });
      setFlash("Saved to Snippets.");
    } catch (e) {
      setError(e.message || "Failed to save snippet");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="home">
      <div className="container">
        <div className="card home__card">
          <h2 className="home__title">Generator</h2>
          <p className="home__hint">
            Paste a brief customer issue. Get steps, commands, and risks.
          </p>

          <form className="home__form" onSubmit={handleSubmit}>
            <label className="home__label" htmlFor="issue">
              Issue
            </label>
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
              <button
                className="button"
                type="submit"
                disabled={!issue.trim() || loading}
              >
                {loading ? "Generating…" : "Generate"}
              </button>
              <button
                className="button button--secondary"
                type="button"
                onClick={() => {
                  setIssue("");
                  setResult(RESULT_EMPTY);
                  setError("");
                  setFlash("");
                }}
                disabled={loading}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="home__resultActions">
            <button
              className="button"
              type="button"
              onClick={handleSave}
              disabled={!canSave}
            >
              {saving ? "Saving…" : "Save as Snippet"}
            </button>
            {flash && (
              <span className="home__flash" role="status">
                {flash}
              </span>
            )}
            {error && (
              <span className="home__error" role="alert">
                {error}
              </span>
            )}
          </div>

          <Result data={result} loading={loading} error={error} />
        </div>
      </div>
    </section>
  );
}

export default Home;
