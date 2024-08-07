import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_empath.png';

const empath: roleType = {
    name: "Empath",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many of your 2 alive neighbors are " +
        "evil.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "empath"],
            " learned a ?"]
    }
};

export default empath;