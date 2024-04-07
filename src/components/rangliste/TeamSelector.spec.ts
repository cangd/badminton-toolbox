import { TeamEnum } from '@/models/TeamEnum'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { type ComponentProps } from 'vue-component-type-helpers'
import TeamSelector from './TeamSelector.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

function setupComponent(overrides: Partial<ComponentProps<typeof TeamSelector>> = {}) {
  const vuetify = createVuetify({
    components,
    directives
  })
  const cut = mount(TeamSelector, {
    props: {
      isDisabled: false,
      teamZugehoerigkeit: TeamEnum.M1,
      ...overrides
    },
    global: {
      plugins: [vuetify]
    }
  })

  return {
    cut
  }
}

describe('TeamSelector.vue ', () => {
  it('is able to set disabled prop', () => {
    const { cut } = setupComponent({ isDisabled: true })

    expect(cut.props().isDisabled).toBe(true)
  })
})
