import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_seamstress.png';

const seamstress: roleType = {
    name: "Washerwoman",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose 2 players (not yourself): you " +
        "learn if they are the same alignment.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "seamstress"],
            " learned that ", [TagTypes.Player, -1], " and ",
            [TagTypes.Player, -1], " are / not on the same team"]
    }
};

export default seamstress;