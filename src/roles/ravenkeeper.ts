import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_ravenkeeper.png';

const ravenkeeper: roleType = {
    name: "Ravenkeeper",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If you die at night, you are woken to choose a player: you " +
        "learn their character.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "ravenkeeper"],
            " died and learned that ", [TagTypes.Player, -1], " is the ",
            [TagTypes.Role, ""]]
    }
};

export default ravenkeeper;