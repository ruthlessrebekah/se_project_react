const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.ruthless-wtwr-2025.jumpingcrab.com"
    : "http://localhost:3001";

// Helper to check fetch response
export function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Error ${response.status}: ${response.statusText}`);
}

// Helper to get authorization headers
function getAuthHeaders() {
  const token = localStorage.getItem("jwt");
  return {
    "Content-Type": "application/json",
    ...(token && { authorization: `Bearer ${token}` }),
  };
}

// GET all clothing items (public route)
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// POST a new clothing item (protected route)
export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(checkResponse);
}

// DELETE a clothing item by ID (protected route)
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

// PATCH to like a clothing item (protected route)
export function likeItem(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

// DELETE to unlike a clothing item (protected route)
export function unlikeItem(id) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);
}

// PATCH to update user profile (protected route)
export function updateProfile(userData) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  }).then(checkResponse);
}
