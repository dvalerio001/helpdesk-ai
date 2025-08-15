import { useEffect, useState } from "react";
import { listSnippets, createSnippet, deleteSnippet } from "../../api/backend.js";
import "./Snippets.css";

function Snippets() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function load() {
    setErr("");
    setLoading(true);
    try {
      const data = await listSnippets();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e.message || "Failed to load snippets");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      const created = await createSnippet({ title: title.trim(), body: body.trim(), tags });
      setItems((prev) => [created, ...prev]);
      setTitle(""); setBody(""); setTagsInput("");
    } catch (e) {
      setErr(e.message || "Create failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setErr("");
    setLoading(true);
    try {
      await deleteSnippet(id);
      setItems((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      setErr(e.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="snippets">
      <h2 className="snippets__title">My Snippets</h2>

      <form className="snippets__form" onSubmit={handleCreate}>
        <label className="snippets__label" htmlFor="snip-title">Title</label>
        <input
          id="snip-title"
          className="snippets__input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          maxLength={120}
        />

        <label className="snippets__label" htmlFor="snip-body">Body</label>
        <textarea
          id="snip-body"
          className="snippets__textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          rows={5}
          maxLength={5000}
        />

        <label className="snippets__label" htmlFor="snip-tags">Tags (comma-separated)</label>
        <input
          id="snip-tags"
          className="snippets__input"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="windows, vpn"
        />

        <div className="snippets__actions">
          <button className="button" type="submit" disabled={loading || !title.trim() || !body.trim()}>
            {loading ? "Saving…" : "Save snippet"}
          </button>
          <button className="button button--secondary" type="button" disabled={loading} onClick={() => { setTitle(""); setBody(""); setTagsInput(""); }}>
            Clear
          </button>
        </div>
      </form>

      {err && <p className="snippets__error">{err}</p>}
      {loading && !items.length && <p className="snippets__status">Loading…</p>}

      <ul className="snippets__list">
        {items.map((s) => (
          <li key={s._id} className="snippets__card">
            <div className="snippets__card-head">
              <h3 className="snippets__card-title">{s.title}</h3>
              <button className="button" type="button" onClick={() => handleDelete(s._id)} disabled={loading}>Delete</button>
            </div>
            <pre className="snippets__card-body">{s.body}</pre>
            {!!s.tags?.length && (
              <div className="snippets__tags">
                {s.tags.map((t, i) => <span key={i} className="snippets__tag">#{t}</span>)}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Snippets;