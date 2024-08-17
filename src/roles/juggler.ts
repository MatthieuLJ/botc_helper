import { ChipType } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_juggler.png';

const juggler: roleType = {
    name: "Juggler",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "juggler"],
            " learned a ? when checking ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, ""], " and ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, ""], " and ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, ""], " and ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, ""], " and ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, ""]]
    }
};

export default juggler;