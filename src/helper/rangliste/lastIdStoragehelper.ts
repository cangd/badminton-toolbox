export function getLastIdFromLocalStorage(): number {
  const storedId = localStorage.getItem('lastId');
  const jsonStoredId = storedId ? JSON.parse(storedId) : '0';
  return parseInt(jsonStoredId);
}

export function saveLastIdToLocalStorage(id: number): void {
  localStorage.setItem('lastId', JSON.stringify(id));
}
