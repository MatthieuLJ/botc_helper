import { roleType, CharacterType } from '../game/role.ts';

const drunk: roleType = {
    name: "Drunk",
    icon: "icon_drunk.png",
    type: CharacterType.Outsider,
    ability: "You do not know you are the Drunk. You think you are a Townsfolk"
        + " character, but you are not.",

    actions: {}
};

export default drunk;