import type Player from '@/models/Player';
import { TeamEnum } from '@/models/TeamEnum';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vitest } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import AddPlayerVue from './AddPlayer.vue';
import TeamSelector from './TeamSelector.vue';

function setupComponent() {
  const vuetify = createVuetify({
    components,
    directives
  });

  const cut = mount(AddPlayerVue, {
    props: {
      playersList: []
    },
    global: {
      plugins: [vuetify]
    }
  });

  const nameInput = () => cut.find('#name');
  const singlesInput = () => cut.find('#singles');
  const doublesInput = () => cut.find('#doubles');
  const addButton = () => cut.find('#button');
  const teamSelector = () => cut.findComponent(TeamSelector);

  return {
    cut,
    nameInput,
    teamSelector,
    singlesInput,
    doublesInput,
    addButton
  };
}

const testPlayer: Player = {
  id: 1,
  name: 'Test Player',
  singles: '100',
  doubles: '100',
  team: TeamEnum.E,
  isInSimulator: true
};

describe('AddPlayer.vue', () => {
  it('add button is initially not rendered', () => {
    const { addButton } = setupComponent();

    expect(addButton().exists()).toBe(false);
  });

  it('add button is rendered when input fields are set', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent();

    expect(nameInput().exists()).toBe(true);
    await nameInput().setValue('Test Player');
    await singlesInput().setValue(110);
    await doublesInput().setValue(200);

    expect(addButton().exists()).toBe(true);
  });

  it('displays teamSelector', () => {
    const { teamSelector } = setupComponent();
    expect(teamSelector().props().teamZugehoerigkeit).toBe(TeamEnum.E);
  });

  it('creates last player Id from LocalStorage', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent();
    vitest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce('20');
    vitest.spyOn(Storage.prototype, 'setItem');
    await nameInput().setValue(testPlayer.name);
    await singlesInput().setValue(testPlayer.singles);
    await doublesInput().setValue(testPlayer.doubles);

    await addButton().trigger('click');

    expect(localStorage.getItem).toHaveBeenCalledWith('lastId');
    expect(localStorage.setItem).toHaveBeenCalledWith('lastId', '21');
  });

  it('adds player to session storage', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent();
    vitest.spyOn(Storage.prototype, 'setItem');
    await nameInput().setValue(testPlayer.name);
    await singlesInput().setValue(testPlayer.singles);
    await doublesInput().setValue(testPlayer.doubles);

    await addButton().trigger('click');

    expect(sessionStorage.setItem).toHaveBeenCalled();
  });

  it('clears form after click', async () => {
    const { nameInput, singlesInput, doublesInput, addButton } = setupComponent();
    await nameInput().setValue('Test Player');
    await singlesInput().setValue(100);
    await doublesInput().setValue(200);

    await addButton().trigger('click');

    expect(nameInput().text()).toBe('');
    expect(singlesInput().text()).toBe('');
    expect(doublesInput().text()).toBe('');
  });
});
