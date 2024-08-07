import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_washerwoman.png';

const washerwoman: roleType = {
    name: "Washerwoman",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing that 1 of 2 players is a particular " +
        "Townsfolk.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "washerwoman"],
            " learned that either ", [EventTypes.Player, -1], " or ",
            [EventTypes.Player, -1], " is the ", [EventTypes.Role, ""]]
    }
};

export default washerwoman;