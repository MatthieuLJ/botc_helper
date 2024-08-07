import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_librarian.png';

const librarian: roleType = {
    name: "Librarian",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular Outsider. "
        + "(Or that zero are in play.)",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "librarian"],
            " learned that either ", [TagTypes.Player, -1], " or ",
            [TagTypes.Player, -1], " is the ", [TagTypes.Role, ""]]
    }
};

export default librarian;