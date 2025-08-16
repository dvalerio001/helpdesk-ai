import "./Result.css";

function Result({ data, loading, error }) {
  if (loading) {
    return (
      <section className="result">
        <p className="result__status">Generating…</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className="result">
        <p className="result__error">{error}</p>
      </section>
    );
  }
  if (
    !data ||
    (!data.steps?.length && !data.commands?.length && !data.risks?.length)
  ) {
    return (
      <section className="result">
        <p className="result__status">No output yet.</p>
      </section>
    );
  }

  return (
    <section className="result" aria-live="polite">
      <h2 className="result__title">Suggested Plan</h2>

      {!!data.steps?.length && (
        <div className="result__block">
          <h3 className="result__subtitle">Steps</h3>
          <ol className="result__list">
            {data.steps.map((s, i) => (
              <li key={i} className="result__item">
                {s}
              </li>
            ))}
          </ol>
        </div>
      )}

      {!!data.commands?.length && (
        <div className="result__block">
          <h3 className="result__subtitle">Commands</h3>
          <ul className="result__list">
            {data.commands.map((c, i) => (
              <li key={i} className="result__item">
                <code>{c}</code>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!!data.risks?.length && (
        <div className="result__block">
          <h3 className="result__subtitle">Risks</h3>
          <ul className="result__list">
            {data.risks.map((r, i) => (
              <li key={i} className="result__item">
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.rationale && (
        <p className="result__rationale">
          <strong>Why:</strong> {data.rationale}
        </p>
      )}
    </section>
  );
}

export default Result;
