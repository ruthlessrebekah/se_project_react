const baseUrl = "http://localhost:3001";

// GET all clothing items
export function getItems() {
  return fetch(`${baseUrl}/items`).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error ${response.status}`);
  });
}

// POST a new clothing item
export function addItem(item) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error ${response.status}`);
  });
}

// DELETE a clothing item by ID
export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error ${response.status}`);
  });
}
