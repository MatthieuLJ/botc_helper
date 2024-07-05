import { roleType, CharacterType } from '../game/role.ts';

const saint: roleType = {
    name: "Saint",
    icon: "icon_saint.png",
    type: CharacterType.Outsider,
    ability: "If you die by execution, your team loses.",

    actions: {}
};

export default saint;