import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_librarian.png';

const librarian: roleType = {
    name: "Librarian",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular Outsider. "
        + "(Or that zero are in play.)",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "librarian"],
            " learned that either ", [EventTypes.Player, -1], " or ",
            [EventTypes.Player, -1], " is the ", [EventTypes.Role, ""]]
    }
};

export default librarian;