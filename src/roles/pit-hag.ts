import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_pithag.png';

const pithag: roleType = {
    name: "Pit-Hag",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night*, choose a player & a character they become (if not" +
        " in play). If a Demon is made, deaths tonight are arbitrary.",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "pit hag"],
            " changed ", [EventTypes.Player, -1], " into ", [EventTypes.Role, ""]]
    }
};

export default pithag;