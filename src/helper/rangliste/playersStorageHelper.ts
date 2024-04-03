import type Player from '@/models/Player.js'

export function getPlayersFromSessionStorage(): Player[] {
  const playersJSON = localStorage.getItem('myRangliste')
  const myRangliste = playersJSON ? JSON.parse(playersJSON) : []
  console.log('MyRangliste', myRangliste)
  return myRangliste
}

export function savePlayersToSessionStorage(array: Player[]): void {
  try {
    localStorage.setItem('myRangliste', JSON.stringify(array))
    console.log('Array saved to session storage successfully.', array)
  } catch (error) {
    console.error('Error saving array to session storage:', error)
  }
}
