const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

function handle(res) {
  if (!res.ok) {
    return res.text().then((t) => {
      throw new Error(t || res.statusText);
    });
  }
  return res.json();
}

async function signup({ name, email, password }) {
  return fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  }).then(handle);
}

async function signin({ email, password }) {
  return fetch(`${API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(handle);
}

async function getMe(token) {
  return fetch(`${API_BASE}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(handle);
}

export { signup, signin, getMe };
