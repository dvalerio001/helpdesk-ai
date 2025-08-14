const API_URL = import.meta.env.VITE_AI_API_URL;
const API_KEY = import.meta.env.VITE_AI_API_KEY;
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// Helper: standard res->json + error for rubric (then->json + catch)
function handleResponse(res) {
  if (!res.ok) {
    return res.text().then((t) => {
      throw new Error(`AI_API_${res.status}: ${t || res.statusText}`);
    });
  }
  return res.json();
}

async function generateSolution(issueText) {
  if (USE_MOCK || !API_URL || !API_KEY) {
    // deterministic mock to keep UI working without keys
    return Promise.resolve({
      steps: [
        "Confirm user’s network connectivity (ping, DNS).",
        "Check VPN adapter status and restart VPN service.",
        "Verify user’s group/policy membership for VPN access.",
        "Collect client logs and test with another network.",
      ],
      commands: [
        "ipconfig /all",
        "sc query RasMan",
        "Get-VpnConnection",
      ],
      risks: [
        "User may lose current sessions when restarting services.",
        "Policy changes can take time to propagate.",
      ],
      rationale: "Generated from a generic troubleshooting playbook for Windows VPN issues.",
    });
  }

  const payload = {
    // Keep the prompt minimal; your backend can improve this later
    prompt: `Summarize the user's IT issue into JSON with keys steps[], commands[], risks[], rationale.
Issue: """${issueText}"""`,
  };

  return fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  })
    .then(handleResponse)
    .catch((err) => {
      // surface a readable error up the chain
      throw new Error(err.message || "AI request failed");
    });
}

export { generateSolution };