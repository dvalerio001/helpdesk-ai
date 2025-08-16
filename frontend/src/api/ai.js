const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE = import.meta.env.VITE_API_BASE;

// Helper: standard res->json + error for rubric (then->json + catch)
function handleResponse(res) {
  if (!res.ok)
    return res.text().then((t) => {
      throw new Error(t || res.statusText);
    });
  return res.json();
}

async function generateSolution(issueText) {
  if (import.meta.env.VITE_USE_MOCK === "true") {
    return {
      steps: ["Check VPN adapter", "Restart service"],
      commands: ["ipconfig /all"],
      risks: ["May interrupt active sessions"],
      rationale: "Mock output for local dev.",
    };
  }
  return fetch(`${API_BASE}/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ issue: issueText }),
  }).then(handleResponse);
}

export { generateSolution };
