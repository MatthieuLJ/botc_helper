import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_ravenkeeper.png';

const ravenkeeper: roleType = {
    name: "Ravenkeeper",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If you die at night, you are woken to choose a player: you " +
        "learn their character.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "ravenkeeper"],
            " died and learned that ", [EventTypes.Player, -1], " is the ",
            [EventTypes.Role, ""]]
    }
};

export default ravenkeeper;