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

  const tableHeadPlayer = () => cut.find('.tablePlayers__head--player')
  const tableHeadSingles = () => cut.find('.tablePlayers__head--singles')
  const tableHeadDoubles = () => cut.find('.tablePlayers__head--doubles')
  const nameField = () => cut.find('.tablePlayers__name--input')
  const singlesField = () => cut.find('.tablePlayers__singles--input')
  const doublesField = () => cut.find('.tablePlayers__doubles--input')
  const actionColumn = () => cut.find('.tablePlayers__action')
  const editButton = () => cut.find('.tablePlayers__action--edit')
  const saveButton = () => cut.find('.tablePlayers__action--save')
  const deleteButton = () => cut.find('.tablePlayers__action--delete')

  window.alert = vitest.fn()

  return {
    cut,
    tableHeadPlayer,
    tableHeadSingles,
    tableHeadDoubles,
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
    const { tableHeadPlayer, tableHeadSingles, tableHeadDoubles } = setupComponent()
    expect(tableHeadPlayer().exists()).toBe(true)
    expect(tableHeadSingles().exists()).toBe(true)
    expect(tableHeadDoubles().exists()).toBe(true)
  })

  it('will not display a table if there are no players', async () => {
    const { deleteButton, tableHeadPlayer, tableHeadSingles, tableHeadDoubles } =
      await setupComponent()

    await deleteButton().trigger('click')
    expect(tableHeadPlayer().exists()).toBe(false)
    expect(tableHeadSingles().exists()).toBe(false)
    expect(tableHeadDoubles().exists()).toBe(false)
  })

  it('fields are initially disabled', () => {
    const { nameField, singlesField, doublesField } = setupComponent()
    expect(nameField().attributes().disabled).toBeDefined()
    expect(singlesField().attributes().disabled).toBeDefined()
    expect(doublesField().attributes().disabled).toBeDefined()
  })

  it('displays player in table', () => {
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
    const { nameField, singlesField, doublesField, editButton } = setupComponent({
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
    expect(nameField().classes()).toContain('tablePlayers__error')
    expect(singlesField().classes()).toContain('tablePlayers__error')
    expect(doublesField().classes()).toContain('tablePlayers__error')
  })

  it('sorts by name', async () => {
    const { tableHeadPlayer, nameField } = setupComponent({
      playersList: [
        {
          id: 3,
          name: 'Berta',
          singles: '100',
          doubles: '110',
          editing: false
        },
        {
          id: 4,
          name: 'Anton',
          singles: '200',
          doubles: '100',
          editing: false
        }
      ]
    })
    expect((nameField().element as HTMLInputElement).value).toBe('Berta')
    await tableHeadPlayer().trigger('click')

    expect((nameField().element as HTMLInputElement).value).toBe('Anton')
  })

  it('sorts by singles', async () => {
    const { tableHeadSingles, singlesField } = setupComponent({
      playersList: [
        {
          id: 3,
          name: 'Berta',
          singles: '100',
          doubles: '110',
          editing: false
        },
        {
          id: 4,
          name: 'Anton',
          singles: '20',
          doubles: '100',
          editing: false
        }
      ]
    })
    expect((singlesField().element as HTMLInputElement).value).toBe('100')
    await tableHeadSingles().trigger('click')

    expect((singlesField().element as HTMLInputElement).value).toBe('20')
  })

  it('sorts by singles', async () => {
    const { tableHeadSingles, doublesField } = setupComponent({
      playersList: [
        {
          id: 3,
          name: 'Berta',
          singles: '100',
          doubles: '110',
          editing: false
        },
        {
          id: 4,
          name: 'Anton',
          singles: '20',
          doubles: '100',
          editing: false
        }
      ]
    })
    expect((doublesField().element as HTMLInputElement).value).toBe('110')
    await tableHeadSingles().trigger('click')

    expect((doublesField().element as HTMLInputElement).value).toBe('100')
  })
})
