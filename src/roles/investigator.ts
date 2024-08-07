import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_investigator.png';

const investigator: roleType = {
    name: "Investigator",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular Minion.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "investigator"],
            " learned that either ", [TagTypes.Player, -1], " or ",
            [TagTypes.Player, -1], " is the ", [TagTypes.Role, ""]]
    }
};

export default investigator;