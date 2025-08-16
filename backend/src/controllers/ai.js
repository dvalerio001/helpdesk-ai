import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
let client = null;

function getClient() {
  const key = process.env.OPENAI_API_KEY || "";
  if (!key) {
    const err = new Error("OPENAI_API_KEY is not set on the server");
    err.statusCode = 500;
    throw err;
  }
  if (!client) client = new OpenAI({ apiKey: key });
  return client;
}

async function generate(req, res, next) {
  try {
    const issue = (req.body.issue || "").toString().trim();
    if (!issue) return res.status(400).json({ error: "Issue text is required" });

    const openai = getClient();

    const response = await openai.responses.create({
  model: MODEL,
  input: [
    { role: "system", content: "You are a senior IT helpdesk engineer." },
    {
      role: "user",
      content:
        "Return ONLY a JSON object with keys: steps[] (strings), commands[] (strings), risks[] (strings), rationale (string). No extra text. Keep commands safe.",
    },
    { role: "user", content: `Issue: """${issue}"""` },
  ],
  // ✅ Correct shape for Responses API JSON mode:
  text: { format: { type: "json_object" } },
});

    const text = response.output_text || "";
    let data = {};
    try { data = JSON.parse(text); } catch (_) {}

    return res.json({
      steps: Array.isArray(data.steps) ? data.steps : [],
      commands: Array.isArray(data.commands) ? data.commands : [],
      risks: Array.isArray(data.risks) ? data.risks : [],
      rationale: typeof data.rationale === "string" ? data.rationale : "",
    });
  } catch (err) {
    return next(err);
  }
}

export default generate;