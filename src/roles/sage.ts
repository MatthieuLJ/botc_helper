import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sage.png';

const sage: roleType = {
    name: "Sage",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",

    actions: {
        "Learn": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "sage"],
            " died and learned that the demon is either ", [EventTypes.Player, -1],
            " or ", [EventTypes.Player, -1]]
    }
};

export default sage;