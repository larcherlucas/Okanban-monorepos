const apiBaseUrl = "http://localhost:3000/api";

export async function fetchAllLists() {
  const httpResponse = await fetch(`${apiBaseUrl}/lists`);
  const lists = await httpResponse.json();
  return lists;
}

export async function fetchAllTags() {
  const httpResponse = await fetch(`${apiBaseUrl}/tags`);
  const tags = await httpResponse.json();
  return tags;
}

export async function fetchCard(cardId) {
  const httpResponse = await fetch(`${apiBaseUrl}/cards/${cardId}`);
  const card = await httpResponse.json();
  return card;
}

export async function createList({ name }) {
  await fetch(`${apiBaseUrl}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
}

export async function createCard({ content, listId }) {
  await fetch(`${apiBaseUrl}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content,
      list_id: listId
    })
  });
}

export async function createTag({ name }) {
  const httpResponse = await fetch(`${apiBaseUrl}/tags`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });
  const createdTag = await httpResponse.json();
  return createdTag;
}

export async function deleteList(listId) {
  await fetch(`${apiBaseUrl}/lists/${listId}`, { method: "DELETE" })
}

export async function deleteCard(cardId) {
  await fetch(`${apiBaseUrl}/cards/${cardId}`, { method: "DELETE" })
}

export async function updateList(listId, { name, position }) {
  await fetch(`${apiBaseUrl}/lists/${listId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, position })
  });
}

export async function updateCard(cardId, { content, color, listId, position }) {
  await fetch(`${apiBaseUrl}/cards/${cardId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, color, list_id: listId, position })
  });
}

export async function addTagsToCard(cardId, tagIds) {
  await Promise.all(tagIds.map(tagId => addTagToCard(cardId, tagId)));
}

export async function removeTagsFromCard(cardId, tagIds) {
  await Promise.all(tagIds.map(tagId => removeTagFromCard(cardId, tagId)));
}

export async function addTagToCard(cardId, tagId) {
  await fetch(`${apiBaseUrl}/cards/${cardId}/tags/${tagId}`, { method: "PUT" });
}

export async function removeTagFromCard(cardId, tagId) {
  await fetch(`${apiBaseUrl}/cards/${cardId}/tags/${tagId}`, { method: "DELETE" });
}
