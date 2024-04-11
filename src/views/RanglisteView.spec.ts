import AddPlayerVue from '@/components/rangliste/AddPlayer.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import TablePlayers from '../components/rangliste/TablePlayers.vue';
import RanglisteView from '../views/RanglisteView.vue';

const wrapper = shallowMount(RanglisteView);

function setupComponent() {
  const cut = shallowMount(RanglisteView);
  const ranglisteComp = cut.findComponent(TablePlayers);
  const addPlayerComp = cut.findComponent(AddPlayerVue);

  return {
    cut,
    ranglisteComp,
    addPlayerComp
  };
}

describe('test', () => {
  it('should load rangliste comp', () => {
    const { ranglisteComp } = setupComponent();
    expect(ranglisteComp.isVisible()).toBe(true);
  });

  it('should load rangliste comp', () => {
    const { addPlayerComp } = setupComponent();
    expect(addPlayerComp.isVisible()).toBe(true);
  });
});
