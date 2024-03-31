import { TeamEnum } from '@/models/TeamEnum'
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import TeamSelector from './TeamSelector.vue'

function setupComponent(overrides: Partial<ComponentProps<typeof TeamSelector>> = {}) {
  const cut = shallowMount(TeamSelector, {
    props: {
      isDisabled: false,
      teamZugehoerigkeit: TeamEnum.M1,
      ...overrides
    }
  })

  const dropDown = () => cut.find('.teamDropdown_select')
  const option = () => cut.findAll('.teamDropdown_select--option')

  return {
    cut,
    dropDown,
    option
  }
}

describe('TeamSelector.vue ', () => {
  it('disables select', () => {
    const { dropDown } = setupComponent({ isDisabled: true })

    expect(dropDown().attributes().disabled).toBeDefined()
  })
})
