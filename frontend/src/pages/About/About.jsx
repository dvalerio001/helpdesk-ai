import "./About.css";
import { APP_NAME } from "../../utils/constants.js";

function About() {
  return (
    <section className="about">
      <div className="container">
        <div className="card about__card">
          <h2 className="about__title">About {APP_NAME}</h2>

          <p className="about__lead">
            {APP_NAME} turns a short helpdesk issue into a structured
            troubleshooting plan you can use in tickets or chats.
          </p>

          <h3 className="about__subtitle">How it works</h3>
          <ol className="about__steps">
            <li>
              Go to <strong>Home</strong> and describe the issue in 1–3
              sentences.
            </li>
            <li>
              Click <strong>Generate</strong> to get a plan.
            </li>
            <li>
              Review the <em>Steps</em>, <em>Commands</em>, and <em>Risks</em>.
            </li>
            <li>
              (Optional) <strong>Save as Snippet</strong> to reuse it later in
              the Snippets page.
            </li>
          </ol>

          <h3 className="about__subtitle">What you’ll get</h3>
          <ul className="about__bullets">
            <li>
              <strong>Steps</strong> — actions to try in order.
            </li>
            <li>
              <strong>Commands</strong> — safe commands to copy/paste.
            </li>
            <li>
              <strong>Risks</strong> — things to watch out for before running
              changes.
            </li>
          </ul>

          <h3 className="about__subtitle">Tips</h3>
          <ul className="about__bullets">
            <li>
              Be specific: include OS, app, error text, and what changed
              recently.
            </li>
            <li>Never paste passwords, tokens, or personal data.</li>
            <li>
              Verify commands in your environment before running on a user’s
              machine.
            </li>
          </ul>

          <p className="about__smallprint">
            Learn more about the model we use in the{" "}
            <a
              className="about__link"
              href="https://platform.openai.com/docs"
              target="_blank"
              rel="noreferrer"
            >
              OpenAI Docs ↗
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
