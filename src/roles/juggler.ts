import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_juggler.png';

const juggler: roleType = {
    name: "Juggler",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "On your 1st day, publicly guess up to 5 players' characters. " +
        "That night, you learn how many you got correct.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "juggler"],
            " learned a ? when checking ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, ""], " and ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, ""], " and ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, ""], " and ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, ""], " and ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, ""]]
    }
};

export default juggler;