import { roleType, CharacterType } from '../game/role.ts';

const scarlet_woman: roleType = {
    name: "Scarlet Woman",
    icon: "icon_scarlet_woman.png",
    type: CharacterType.Minion,
    ability: "If there are 5 or more players alive & the Demon dies, you " +
        "become the Demon. (Travellers don't count)",

    actions: {}
};

export default scarlet_woman;