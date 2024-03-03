import type Player from '@/models/Player'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import TablePlayersVue from './TablePlayers.vue'

function setupComponent(overrides: Partial<ComponentProps<typeof TablePlayersVue>> = {}) {
  const cut = shallowMount(TablePlayersVue, {
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

  const tableHeader = () => cut.find('.tablePlayers__head')
  const nameField = () => cut.find('.tablePlayers__name--input')
  const singlesField = () => cut.find('.tablePlayers__singles--input')
  const doublesField = () => cut.find('.tablePlayers__doubles--input')
  const actionColumn = () => cut.find('.tablePlayers__action')
  const editButton = () => cut.find('.tablePlayers__action--edit')
  const saveButton = () => cut.find('.tablePlayers__action--save')
  const deleteButton = () => cut.find('.tablePlayers__action--delete')

  return {
    cut,
    tableHeader,
    nameField,
    singlesField,
    doublesField,
    actionColumn,
    editButton,
    saveButton,
    deleteButton
  }
}

const playersList: Player[] = [
  {
    id: 1,
    name: 'TestPlayer',
    singles: '100',
    doubles: '110',
    editing: false
  },
  {
    id: 2,
    name: 'TestPlayer2',
    singles: '90',
    doubles: '900',
    editing: false
  }
]

describe('TablePlayers.vue ', () => {
  it('displays a table header', () => {
    const { tableHeader } = setupComponent()
    expect(tableHeader().exists()).toBe(true)
  })

  it('fields are initially disabled', () => {
    const { nameField, singlesField, doublesField } = setupComponent()
    expect(nameField().attributes().disabled).toBeDefined()
    expect(singlesField().attributes().disabled).toBeDefined()
    expect(doublesField().attributes().disabled).toBeDefined()
  })

  it('displays players', () => {
    const { nameField, singlesField, doublesField } = setupComponent({})
    expect((nameField().element as HTMLInputElement).value).toBe('TestPlayer')
    expect((singlesField().element as HTMLInputElement).value).toBe('100')
    expect((doublesField().element as HTMLInputElement).value).toBe('110')
  })

  it('displays edit and delete button for a player', () => {
    const { editButton, deleteButton } = setupComponent()
    expect(editButton().exists()).toBe(true)
    expect(deleteButton().exists()).toBe(true)
  })

  it('save button is not initially rendered', () => {
    const { saveButton } = setupComponent()
    expect(saveButton().exists()).toBe(false)
  })

  it('displays save for a player when edit is clicked', async () => {
    const { editButton, saveButton } = setupComponent()

    await editButton().trigger('click')

    expect(saveButton().exists()).toBe(true)
  })

  it('edits player after clicking edit button', async () => {
    const { nameField, singlesField, doublesField, editButton } = setupComponent()
    await editButton().trigger('click')

    await nameField().setValue('Profi')
    await singlesField().setValue('10')
    await doublesField().setValue('20')

    //Typecasting avoids type error
    const inputName = nameField().element as HTMLInputElement
    expect(inputName.value).toBe('Profi')

    const inputSingles = singlesField().element as HTMLInputElement
    expect(inputSingles.value).toBe('10')

    const inputDoubles = doublesField().element as HTMLInputElement
    expect(inputDoubles.value).toBe('20')
  })

  it('saves player after editing', async () => {
    const { cut, nameField, singlesField, doublesField, editButton, saveButton } = setupComponent()
    await editButton().trigger('click')

    await nameField().setValue('Profi')
    await singlesField().setValue('10')
    await doublesField().setValue('20')

    await saveButton().trigger('click')

    expect(cut.props().playersList).toStrictEqual([
      { id: 1, name: 'Profi', singles: '10', doubles: '20', editing: false }
    ])
  })

  it('prompts an alert when the same value is already existing in singles', async () => {
    vitest.spyOn(window, 'alert')
    const { singlesField, editButton, saveButton } = setupComponent({
      playersList
    })
    await editButton().trigger('click')

    await singlesField().setValue('90')
    await saveButton().trigger('click')

    expect(window.alert).toHaveBeenCalledWith('Name, Singles and Doubles values must be unique.')
  })

  it('prompts an alert when the same value is already existing in doubles', async () => {
    vitest.spyOn(window, 'alert')
    const { doublesField, editButton, saveButton } = setupComponent({
      playersList
    })
    vitest.spyOn(window, 'alert')
    await editButton().trigger('click')

    await doublesField().setValue('900')
    await saveButton().trigger('click')

    expect(window.alert).toHaveBeenCalledWith('Name, Singles and Doubles values must be unique.')
  })

  it('field is marked red when having the same values', async () => {
    const { cut, nameField, singlesField, doublesField, editButton } = setupComponent({
      playersList: [
        {
          id: 3,
          name: 'TestPlayer3',
          singles: '100',
          doubles: '110',
          editing: false
        },
        {
          id: 4,
          name: 'TestPlayer3',
          singles: '100',
          doubles: '110',
          editing: false
        }
      ]
    })
    await editButton().trigger('click')
    console.log(cut.html())
    expect(nameField().classes()).toContain('tablePlayers__error')
    expect(singlesField().classes()).toContain('tablePlayers__error')
    expect(doublesField().classes()).toContain('tablePlayers__error')
  })
})
