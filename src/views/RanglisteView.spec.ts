import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Rangliste from '../components/rangliste/Rangliste.vue'
import RanglisteView from '../views/RanglisteView.vue'

const wrapper = shallowMount(RanglisteView)

function setupComponent() {
  const cut = shallowMount(RanglisteView)
  const nameInput = cut.find('#name')
  const singlesInput = cut.find('#singles')
  const doublesInput = cut.find('#doubles')
  const addButton = cut.find('#button')
  const ranglisteComp = cut.findComponent(Rangliste)

  return {
    cut,
    nameInput,
    singlesInput,
    doublesInput,
    addButton,
    ranglisteComp
  }
}

describe('test', () => {
  it('renders properly', () => {
    expect(wrapper.text()).toContain('Rangliste')
  })

  it('should load rangliste comp', () => {
    const { ranglisteComp } = setupComponent()
    expect(ranglisteComp.isVisible()).toBe(true)
  })

  it('button should have name and ratings', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent()
    await nameInput.setValue('Test Player')
    await singlesInput.setValue(100)
    await doublesInput.setValue(200)
    expect(addButton.exists()).toBe(true)
    expect(addButton.text()).toContain('Add Test Player(100/200)')
  })
})
