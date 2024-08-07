import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_investigator.png';

const investigator: roleType = {
    name: "Investigator",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular Minion.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "investigator"],
            " learned that either ", [EventTypes.Player, -1], " or ",
            [EventTypes.Player, -1], " is the ", [EventTypes.Role, ""]]
    }
};

export default investigator;