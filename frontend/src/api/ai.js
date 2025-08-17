const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE = import.meta.env.VITE_API_BASE;

function handleResponse(res) {
  if (!res.ok) {
    return res.text().then((t) => {
      throw new Error(t || res.statusText);
    });
  }
  return res.json();
}

export async function generateSolution(issueText) {
  if (USE_MOCK) {
    return {
      steps: ["Check VPN adapter", "Restart service"],
      commands: ["ipconfig /all"],
      risks: ["May interrupt active sessions"],
      rationale: "Mock output for local dev.",
    };
  }
  const token = localStorage.getItem("token");
  return fetch(`${API_BASE}/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ issue: issueText }),
  }).then(handleResponse);
}
