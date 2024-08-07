import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_juggler.png';

const juggler: roleType = {
    name: "Juggler",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "juggler"],
            " learned a ? when checking ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, ""], " and ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, ""], " and ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, ""], " and ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, ""], " and ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, ""]]
    }
};

export default juggler;