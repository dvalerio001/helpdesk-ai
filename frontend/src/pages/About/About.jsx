import "./About.css";

function About() {
  return (
    <section className="about">
      <h2 className="about__title">About HelpDesk AI</h2>
      <p className="about__text">
        This app turns messy tickets into clear, repeatable troubleshooting steps
        and lets you save proven fixes as snippets. We’ll add authentication,
        snippet saving, and an AI call shortly.
      </p>
    </section>
  );
}

export default About;