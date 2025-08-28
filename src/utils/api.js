const baseUrl = "http://localhost:3001";

// Helper to check fetch response
function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Error ${response.status}`);
}

// GET all clothing items
export function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

// POST a new clothing item
export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(checkResponse);
}

// DELETE a clothing item by ID
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
}
