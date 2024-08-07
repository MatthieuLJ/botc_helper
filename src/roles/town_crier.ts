import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_towncrier.png';

const town_crier: roleType = {
    name: "Town crier",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Minion nominated today.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "town crier"],
            " learned ?"]
    }
};

export default town_crier;