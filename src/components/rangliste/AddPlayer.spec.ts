import type Player from '@/models/Player'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import AddPlayerVue from './AddPlayer.vue'

function setupComponent() {
  const cut = shallowMount(AddPlayerVue)
  const nameInput = () => cut.find('#name')
  const singlesInput = () => cut.find('#singles')
  const doublesInput = () => cut.find('#doubles')
  const addButton = () => cut.find('#button')

  return {
    cut,
    nameInput,
    singlesInput,
    doublesInput,
    addButton
  }
}

describe('AddPlayer.vue', () => {
  it('add button is initially not rendered', () => {
    const { addButton } = setupComponent()

    expect(addButton().exists()).toBe(false)
  })

  it('add button is rendered when input fields are set', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()

    await nameInput().setValue('Test Player')
    await singlesInput().setValue(100)
    await doublesInput().setValue(200)

    expect(addButton().exists()).toBe(true)
  })
  it('button should have name and ratings', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()

    await nameInput().setValue('Test Player')
    await singlesInput().setValue(100)
    await doublesInput().setValue(200)

    expect(addButton().text()).toContain('Add Test Player(100/200)')
  })

  it('creates last player Id from LocalStorage', async () => {
    vitest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('20')
    vitest.spyOn(Storage.prototype, 'setItem')
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    const testPlayer: Player = {
      id: 1,
      name: 'Test Player',
      singles: '100',
      doubles: '100'
    }

    await nameInput().setValue(testPlayer.name)
    await singlesInput().setValue(testPlayer.singles)
    await doublesInput().setValue(testPlayer.doubles)
    await addButton().trigger('click')

    expect(localStorage.getItem).toHaveBeenCalledWith('lastId')
    expect(localStorage.setItem).toHaveBeenCalledWith('lastId', '21')
  })

  it('adds player to session storage', async () => {
    vitest.spyOn(Storage.prototype, 'setItem')
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    const testPlayer: Player = {
      id: 1,
      name: 'Test Player',
      singles: '100',
      doubles: '100'
    }

    await nameInput().setValue(testPlayer.name)
    await singlesInput().setValue(testPlayer.singles)
    await doublesInput().setValue(testPlayer.doubles)
    await addButton().trigger('click')

    expect(sessionStorage.setItem).toHaveBeenCalled()
  })

  it('clears form after click', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    await nameInput().setValue('Test Player')
    await singlesInput().setValue(100)
    await doublesInput().setValue(200)
    await addButton().trigger('click')
    expect(nameInput().text()).toBe('')
    expect(singlesInput().text()).toBe('')
    expect(doublesInput().text()).toBe('')
  })

  it('emits <update:players> event after click', async () => {
    const { cut, nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    await nameInput().setValue('Test Player')
    await singlesInput().setValue(100)
    await doublesInput().setValue(200)
    await addButton().trigger('click')
    expect(cut.emitted('update:players')).toBeDefined()
  })
})
