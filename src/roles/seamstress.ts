import { ChipType } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_seamstress.png';

const seamstress: roleType = {
    name: "Washerwoman",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose 2 players (not yourself): you " +
        "learn if they are the same alignment.",

    actions: {
        "Learn": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "seamstress"],
            " learned that ", [ChipType.Player, -1], " and ",
            [ChipType.Player, -1], " are / not on the same team"]
    }
};

export default seamstress;