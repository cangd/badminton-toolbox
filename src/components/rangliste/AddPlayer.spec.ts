import type Player from '@/models/Player'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import AddPlayerVue from './AddPlayer.vue'

function setupComponent(overrides: Partial<ComponentProps<typeof AddPlayerVue>> = {}) {
  const vuetify = createVuetify({
    components,
    directives
  })

  const cut = mount(AddPlayerVue, {
    global: {
      plugins: [vuetify]
    },
    props: {
      playersList: [
        {
          id: 1,
          name: 'TestPlayer',
          singles: '100',
          doubles: '110',
          editing: false
        }
      ],
      ...overrides
    }
  })
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

const testPlayer: Player = {
  id: 1,
  name: 'Test Player',
  singles: '300',
  doubles: '300'
}

describe('AddPlayer.vue', () => {
  it('add button is initially not rendered', () => {
    const { addButton } = setupComponent()

    expect(addButton().exists()).toBe(false)
  })

  it('add button is rendered when input fields are set', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()

    expect(nameInput().exists()).toBe(true)
    await nameInput().setValue('Test Player')
    await singlesInput().setValue(110)
    await doublesInput().setValue(200)

    expect(addButton().exists()).toBe(true)
  })
  it('button should have name and ratings', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()

    await nameInput().setValue('Test Player')
    await singlesInput().setValue(110)
    await doublesInput().setValue(200)

    expect(addButton().text()).toContain('Add Test Player(110/200)')
  })

  it('creates last player Id from LocalStorage', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    vitest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('20')
    vitest.spyOn(Storage.prototype, 'setItem')
    await nameInput().setValue(testPlayer.name)
    await singlesInput().setValue(testPlayer.singles)
    await doublesInput().setValue(testPlayer.doubles)

    await addButton().trigger('click')

    expect(localStorage.getItem).toHaveBeenCalledWith('lastId')
    expect(localStorage.setItem).toHaveBeenCalledWith('lastId', '21')
  })

  it('adds player to session storage', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    vitest.spyOn(Storage.prototype, 'setItem')
    await nameInput().setValue(testPlayer.name)
    await singlesInput().setValue(testPlayer.singles)
    await doublesInput().setValue(testPlayer.doubles)

    await addButton().trigger('click')

    expect(sessionStorage.setItem).toHaveBeenCalled()
  })

  it('clears form after click', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    await nameInput().setValue('Test Player')
    await singlesInput().setValue(130)
    await doublesInput().setValue(130)

    await addButton().trigger('click')

    expect(nameInput().text()).toBe('')
    expect(singlesInput().text()).toBe('')
    expect(doublesInput().text()).toBe('')
  })
})
