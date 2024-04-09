import type Player from '@/models/Player'
import { TeamEnum } from '@/models/TeamEnum'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TablePlayersVue from './TablePlayers.vue'
import TeamSelector from './TeamSelector.vue'

function setupComponent(overrides: Partial<ComponentProps<typeof TablePlayersVue>> = {}) {
  const vuetify = createVuetify({
    components,
    directives
  })

  const cut = mount(TablePlayersVue, {
    props: {
      playersList: [
        {
          id: 1,
          name: 'TestPlayer',
          singles: '100',
          doubles: '110',
          isEditing: false,
          team: TeamEnum.E,
          isInSimulator: false
        }
      ],

      playersInSimulator: [
        {
          id: 2,
          name: 'TestPlayer1',
          singles: '110',
          doubles: '120',
          isEditing: false,
          team: TeamEnum.E,
          isInSimulator: true
        }
      ],
      ...overrides
    },
    global: {
      components: {
        TablePlayersVue
      },
      plugins: [vuetify]
    }
  })

  const tableHeadPlayer = () => cut.find('.tablePlayers__head-player')
  const tableHeadSingles = () => cut.find('.tablePlayers__head-singles')
  const tableHeadDoubles = () => cut.find('.tablePlayers__head-doubles')
  const tableHeadTeam = () => cut.find('.tablePlayers__head-team')
  const tableHeadAction = () => cut.find('.tablePlayers__head-action')

  const nameField = () => cut.find('#tablePlayersName')
  const singlesField = () => cut.find('#tablePlayersSingles')
  const doublesField = () => cut.find('#tablePlayersDoubles')
  const actionColumn = () => cut.find('.tablePlayers__action')
  const editButton = () => cut.find('#tablePlayersEdit')
  const saveButton = () => cut.find('#tablePlayersSave')
  const deleteButton = () => cut.find('#tablePlayersDelete')

  const nameFieldError = () => cut.find('.tablePlayers__input-name.tablePlayers__error')
  const singlesFieldError = () => cut.find('.tablePlayers__input-singles.tablePlayers__error')
  const doublesFieldError = () => cut.find('.tablePlayers__input-doubles.tablePlayers__error')
  const addToSimulatorIcon = () => cut.find('#tablePlayersAddToSimulator')
  const removeFromSimulatorIcon = () => cut.find('#tablePlayersRemoveFromSimulator')
  const playerSelected = () => cut.find('.tablePlayers__selected')

  vitest.spyOn(window, 'alert')

  const teamSelector = () => cut.findComponent(TeamSelector)

  window.alert = vitest.fn()

  return {
    cut,
    tableHeadPlayer,
    tableHeadSingles,
    tableHeadDoubles,
    tableHeadTeam,
    tableHeadAction,
    nameField,
    singlesField,
    doublesField,
    actionColumn,
    editButton,
    saveButton,
    deleteButton,
    teamSelector,
    nameFieldError,
    singlesFieldError,
    doublesFieldError,
    addToSimulatorIcon,
    removeFromSimulatorIcon,
    playerSelected
  }
}

describe('TablePlayers.vue ', () => {
  it('displays a table header', () => {
    const { tableHeadPlayer, tableHeadSingles, tableHeadDoubles, tableHeadTeam, tableHeadAction } =
      setupComponent()
    expect(tableHeadPlayer().exists()).toBe(true)
    expect(tableHeadSingles().exists()).toBe(true)
    expect(tableHeadDoubles().exists()).toBe(true)
    expect(tableHeadTeam().exists()).toBe(true)
    expect(tableHeadAction().exists()).toBe(true)
  })

  it('will not display a table if there are no players', async () => {
    const { editButton, deleteButton, tableHeadPlayer, tableHeadSingles, tableHeadDoubles } =
      setupComponent()
    await editButton().trigger('click')
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
    const { teamSelector, nameField, singlesField, doublesField } = setupComponent()
    expect((nameField().element as HTMLInputElement).value).toBe('TestPlayer')
    expect((singlesField().element as HTMLInputElement).value).toBe('100')
    expect((doublesField().element as HTMLInputElement).value).toBe('110')
    expect(teamSelector().props().teamZugehoerigkeit).toBe(TeamEnum.E)
  })

  it('displays edit and delete button for a player', () => {
    const { editButton } = setupComponent()
    expect(editButton().exists()).toBe(true)
  })

  it('delete button is not initially rendered', () => {
    const { deleteButton } = setupComponent()
    expect(deleteButton().exists()).toBe(false)
  })

  it('save button is not initially rendered', () => {
    const { saveButton } = setupComponent()
    expect(saveButton().exists()).toBe(false)
  })

  it('displays save and delete button for a player when edit is clicked', async () => {
    const { editButton, saveButton, deleteButton } = setupComponent()

    await editButton().trigger('click')

    expect(deleteButton().exists()).toBe(true)
    expect(saveButton().exists()).toBe(true)
  })

  describe('edit player', () => {
    it('changes name', async () => {
      const { nameField, editButton } = setupComponent()
      await editButton().trigger('click')
      await nameField().setValue('Profi')

      //Typecasting avoids type error
      const inputName = nameField().element as HTMLInputElement
      expect(inputName.value).toBe('Profi')
    })
    it('changes singles rating', async () => {
      const { singlesField, editButton } = setupComponent()
      await editButton().trigger('click')
      await singlesField().setValue('10')

      //Typecasting avoids type error
      const inputSingles = singlesField().element as HTMLInputElement
      expect(inputSingles.value).toBe('10')
    })
    it('changes doubles rating', async () => {
      const { doublesField, editButton } = setupComponent()
      await editButton().trigger('click')
      await doublesField().setValue('20')

      //Typecasting avoids type error
      const inputDoubles = doublesField().element as HTMLInputElement
      expect(inputDoubles.value).toBe('20')
    })
    it('changes team', async () => {
      const { teamSelector, editButton } = setupComponent()
      await editButton().trigger('click')

      await teamSelector().setValue(TeamEnum.M4)

      expect(teamSelector().props().teamZugehoerigkeit).toBe(TeamEnum.M4)
    })
  })

  it('saves player after editing', async () => {
    const { cut, nameField, singlesField, doublesField, editButton, saveButton } = setupComponent()
    await editButton().trigger('click')

    await nameField().setValue('Profi')
    await singlesField().setValue('10')
    await doublesField().setValue('20')

    await saveButton().trigger('click')

    expect(cut.props().playersList).toStrictEqual([
      {
        id: 1,
        name: 'Profi',
        singles: '10',
        doubles: '20',
        isEditing: false,
        team: TeamEnum.E,
        isInSimulator: false
      }
    ])
  })

  describe('validation and error handling', () => {
    const playersList: Player[] = [
      {
        id: 1,
        name: 'TestPlayer',
        singles: '100',
        doubles: '110',
        isEditing: false,
        team: TeamEnum.M1,
        isInSimulator: false
      },
      {
        id: 2,
        name: 'TestPlayer2',
        singles: '90',
        doubles: '900',
        isEditing: false,
        team: TeamEnum.E,
        isInSimulator: false
      }
    ]

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
      await editButton().trigger('click')

      await doublesField().setValue('900')
      await saveButton().trigger('click')

      expect(window.alert).toHaveBeenCalledWith('Name, Singles and Doubles values must be unique.')
    })

    it('field is marked red when having the same values', async () => {
      const { nameFieldError, singlesFieldError, doublesFieldError, editButton } = setupComponent({
        playersList: [
          {
            id: 3,
            name: 'TestPlayer3',
            singles: '100',
            doubles: '110',
            isEditing: false,
            team: TeamEnum.E,
            isInSimulator: false
          },
          {
            id: 4,
            name: 'TestPlayer3',
            singles: '100',
            doubles: '110',
            isEditing: false,
            team: TeamEnum.M1,
            isInSimulator: false
          }
        ]
      })
      await editButton().trigger('click')
      expect(nameFieldError().exists()).toBe(true)
      expect(singlesFieldError().exists()).toBe(true)
      expect(doublesFieldError().exists()).toBe(true)
    })
  })

  describe('sort table', () => {
    const p1 = {
      id: 3,
      name: 'Berta',
      singles: '100',
      doubles: '130',
      isEditing: false,
      team: TeamEnum.M1,
      isInSimulator: false
    }
    const p2 = {
      id: 4,
      name: 'Anton',
      singles: '20',
      doubles: '120',
      isEditing: false,
      team: TeamEnum.M1,
      isInSimulator: false
    }

    it('sorts by name', async () => {
      const { tableHeadPlayer, nameField } = setupComponent({
        playersList: [p1, p2]
      })
      expect((nameField().element as HTMLInputElement).value).toBe('Berta')
      await tableHeadPlayer().trigger('click')

      expect((nameField().element as HTMLInputElement).value).toBe('Anton')
    })

    it('sorts by singles', async () => {
      const { tableHeadSingles, singlesField } = setupComponent({
        playersList: [p1, p2]
      })
      expect((singlesField().element as HTMLInputElement).value).toBe('100')
      await tableHeadSingles().trigger('click')

      expect((singlesField().element as HTMLInputElement).value).toBe('20')
    })

    it('sorts by doubles', async () => {
      const { tableHeadDoubles, doublesField } = setupComponent({
        playersList: [p1, p2]
      })
      expect((doublesField().element as HTMLInputElement).value).toBe('130')
      await tableHeadDoubles().trigger('click')

      expect((doublesField().element as HTMLInputElement).value).toBe('120')
    })
  })

  describe('add to simulator', () => {
    it('shows removeFromSimulatorIcon after clicking on addToSimulator', async () => {
      const { addToSimulatorIcon, removeFromSimulatorIcon } = setupComponent()

      await addToSimulatorIcon().trigger('click')

      expect(removeFromSimulatorIcon().exists()).toBe(true)
    })

    it('highlights the player after clicking on addToSimulator', async () => {
      const { addToSimulatorIcon, playerSelected } = setupComponent()

      await addToSimulatorIcon().trigger('click')

      expect(playerSelected().exists()).toBe(true)
    })
  })

  describe('remove from simulator', () => {
    it('shows addToSimulatorIcon when clicking on removeFromSimulator', async () => {
      const { addToSimulatorIcon, removeFromSimulatorIcon } = setupComponent()

      await addToSimulatorIcon().trigger('click')
      await removeFromSimulatorIcon().trigger('click')

      expect(addToSimulatorIcon().exists()).toBe(true)
    })

    it('removes highlight from player', async () => {
      const { addToSimulatorIcon, playerSelected, removeFromSimulatorIcon } = setupComponent()
      await addToSimulatorIcon().trigger('click')
      await removeFromSimulatorIcon().trigger('click')

      expect(playerSelected().exists()).toBe(false)
    })
  })
})
