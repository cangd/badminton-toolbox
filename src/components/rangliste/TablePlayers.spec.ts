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
          editing: false,
          team: TeamEnum.E
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
    doublesFieldError
  }
}

const playersList: Player[] = [
  {
    id: 1,
    name: 'TestPlayer',
    singles: '100',
    doubles: '110',
    editing: false,
    team: TeamEnum.M1
  },
  {
    id: 2,
    name: 'TestPlayer2',
    singles: '90',
    doubles: '900',
    editing: false,
    team: TeamEnum.E
  }
]

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
      { id: 1, name: 'Profi', singles: '10', doubles: '20', editing: false, team: TeamEnum.E }
    ])
  })

  describe('validation and error handling', () => {
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
      const { cut, nameFieldError, singlesFieldError, doublesFieldError, editButton } =
        setupComponent({
          playersList: [
            {
              id: 3,
              name: 'TestPlayer3',
              singles: '100',
              doubles: '110',
              editing: false,
              team: TeamEnum.E
            },
            {
              id: 4,
              name: 'TestPlayer3',
              singles: '100',
              doubles: '110',
              editing: false,
              team: TeamEnum.M1
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
    it('sorts by name', async () => {
      const { tableHeadPlayer, nameField } = setupComponent({
        playersList: [
          {
            id: 3,
            name: 'Berta',
            singles: '100',
            doubles: '110',
            editing: false,
            team: TeamEnum.M1
          },
          {
            id: 4,
            name: 'Anton',
            singles: '200',
            doubles: '100',
            editing: false,
            team: TeamEnum.M1
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
            editing: false,
            team: TeamEnum.M1
          },
          {
            id: 4,
            name: 'Anton',
            singles: '20',
            doubles: '100',
            editing: false,
            team: TeamEnum.M1
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
            editing: false,
            team: TeamEnum.M1
          },
          {
            id: 4,
            name: 'Anton',
            singles: '20',
            doubles: '100',
            editing: false,
            team: TeamEnum.M1
          }
        ]
      })
      expect((doublesField().element as HTMLInputElement).value).toBe('110')
      await tableHeadSingles().trigger('click')

      expect((doublesField().element as HTMLInputElement).value).toBe('100')
    })
  })
})
