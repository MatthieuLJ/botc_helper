import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_savant.png';

const savant: roleType = {
    name: "Savant",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each day, you may visit the Storyteller to learn 2 things in " +
        "private: 1 is true & 1 is false.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "savant"],
            " learned that either ? or ?"]
    }
};

export default savant;