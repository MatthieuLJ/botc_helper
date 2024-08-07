import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_sage.png';

const sage: roleType = {
    name: "Sage",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "sage"],
            " died and learned that the demon is either ", [TagTypes.Player, -1],
            " or ", [TagTypes.Player, -1]]
    }
};

export default sage;