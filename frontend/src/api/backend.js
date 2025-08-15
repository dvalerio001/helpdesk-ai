const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token") || "";
}

function handle(res) {
  if (!res.ok) {
    return res.text().then((t) => {
      const msg = t || res.statusText || `HTTP_${res.status}`;
      throw new Error(msg);
    });
  }
  // 204 (No Content) → return true
  return res.status === 204 ? true : res.json();
}

function listSnippets() {
  return fetch(`${API_BASE}/snippets`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(handle);
}

function createSnippet({ title, body, tags }) {
  return fetch(`${API_BASE}/snippets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ title, body, tags }),
  }).then(handle);
}

function deleteSnippet(id) {
  return fetch(`${API_BASE}/snippets/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  }).then(handle);
}

export { listSnippets, createSnippet, deleteSnippet };