function pickTagsFromIssue(issue) {
  const text = issue.toLowerCase();
  const tags = [];
  if (/\bwindows\b|\bwin(10|11)?\b/.test(text)) tags.push("windows");
  if (/\bmac(os)?\b|\bos x\b/.test(text)) tags.push("mac");
  if (/\blinux\b|ubuntu|debian|fedora/.test(text)) tags.push("linux");
  if (/\bvpn\b/.test(text)) tags.push("vpn");
  if (/\bprinter\b|print/.test(text)) tags.push("printer");
  if (/\bnetwork\b|wifi|ethernet|dns|dhcp/.test(text)) tags.push("network");
  if (/\bo365\b|office 365|outlook\b/.test(text)) tags.push("o365");
  return Array.from(new Set(tags)).slice(0, 6);
}

function buildSnippetFromResult(issue, result) {
  const rawTitle = issue.trim().replace(/\s+/g, " ");
  const title = rawTitle
    ? (rawTitle.length > 80 ? `${rawTitle.slice(0, 77)}…` : rawTitle)
    : "AI plan";

  const parts = [];
  if (issue.trim()) parts.push(`Issue:\n${issue.trim()}`);

  if (Array.isArray(result?.steps) && result.steps.length) {
    parts.push(`Steps:\n${result.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`);
  }

  if (Array.isArray(result?.commands) && result.commands.length) {
    parts.push(`Commands:\n${result.commands.map((c) => `- ${c}`).join("\n")}`);
  }

  if (Array.isArray(result?.risks) && result.risks.length) {
    parts.push(`Risks:\n${result.risks.map((r) => `- ${r}`).join("\n")}`);
  }

  if (typeof result?.rationale === "string" && result.rationale.trim()) {
    parts.push(`Rationale:\n${result.rationale.trim()}`);
  }

  const body = parts.join("\n\n");
  const tags = pickTagsFromIssue(issue);

  return { title, body, tags };
}

export default buildSnippetFromResult;