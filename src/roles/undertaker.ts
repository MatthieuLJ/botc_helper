import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_undertaker.png';

const undertaker: roleType = {
    name: "Undertaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn which character died by execution today.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "undertaker"],
            " learned that ", [TagTypes.Player, -1], " is ",
            [TagTypes.Role, ""],]
    }
};

export default undertaker;