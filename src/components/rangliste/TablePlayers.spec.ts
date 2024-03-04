import type Player from '@/models/Player'
import { TeamEnum } from '@/models/TeamEnum'
import { mount, shallowMount } from '@vue/test-utils'
import { describe, expect, it, vitest } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import TablePlayersVue from './TablePlayers.vue'
import TeamSelector from './TeamSelector.vue'

function setupComponent(overrides: Partial<ComponentProps<typeof TablePlayersVue>> = {}) {
  const shallowMountCut = shallowMount(TablePlayersVue, {
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
    }
  })

  const tableHeadPlayer = () => shallowMountCut.find('.tablePlayers__head-player')
  const tableHeadSingles = () => shallowMountCut.find('.tablePlayers__head-singles')
  const tableHeadDoubles = () => shallowMountCut.find('.tablePlayers__head-doubles')
  const tableHeadTeam = () => shallowMountCut.find('.tablePlayers__head-team')
  const tableHeadAction = () => shallowMountCut.find('.tablePlayers__head-action')

  const nameField = () => shallowMountCut.find('.tablePlayers__input-name')
  const singlesField = () => shallowMountCut.find('.tablePlayers__input-singles')
  const doublesField = () => shallowMountCut.find('.tablePlayers__input-doubles')
  const actionColumn = () => shallowMountCut.find('.tablePlayers__action')
  const editButton = () => shallowMountCut.find('.tablePlayers__action--edit')
  const saveButton = () => shallowMountCut.find('.tablePlayers__action--save')
  const deleteButton = () => shallowMountCut.find('.tablePlayers__action--delete')

  vitest.spyOn(window, 'alert')

  const mountCut = mount(TablePlayersVue, {
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
    }
  })

  const teamSelectorComp = () => mountCut.findComponent(TeamSelector)
  const teamSelector = teamSelectorComp().find('select')

  window.alert = vitest.fn()

  return {
    shallowMountCut,
    mountCut,
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
    teamSelector
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
    const { nameField, singlesField, doublesField, teamSelector } = setupComponent({})
    expect((nameField().element as HTMLInputElement).value).toBe('TestPlayer')
    expect((singlesField().element as HTMLInputElement).value).toBe('100')
    expect((doublesField().element as HTMLInputElement).value).toBe('110')
    expect(teamSelector.element.value).toBe('Ersatz')
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

      await teamSelector.setValue(TeamEnum.M4)

      expect(teamSelector.element.value).toEqual('M4')
    })
  })

  it('saves player after editing', async () => {
    const { shallowMountCut, nameField, singlesField, doublesField, editButton, saveButton } =
      setupComponent()
    await editButton().trigger('click')

    await nameField().setValue('Profi')
    await singlesField().setValue('10')
    await doublesField().setValue('20')

    await saveButton().trigger('click')

    expect(shallowMountCut.props().playersList).toStrictEqual([
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
      const { nameField, singlesField, doublesField, editButton } = setupComponent({
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
      expect(nameField().classes()).toContain('tablePlayers__error')
      expect(singlesField().classes()).toContain('tablePlayers__error')
      expect(doublesField().classes()).toContain('tablePlayers__error')
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
