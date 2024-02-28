import type Player from '@/models/Player.js'

export function getPlayersFromSessionStorage(): Player[] {
  const playersJSON = sessionStorage.getItem('myRangliste')
  const myRangliste = playersJSON ? JSON.parse(playersJSON) : []
  console.log('MyRangliste', myRangliste)
  return myRangliste
}

export function saveArrayToSessionStorage(key: string, array: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(array))
    console.log('Array saved to session storage successfully.', array)
  } catch (error) {
    console.error('Error saving array to session storage:', error)
  }
}
