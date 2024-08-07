import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_savant.png';

const savant: roleType = {
    name: "Savant",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each day, you may visit the Storyteller to learn 2 things in " +
        "private: 1 is true & 1 is false.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "savant"],
            " learned that either ? or ?"]
    }
};

export default savant;