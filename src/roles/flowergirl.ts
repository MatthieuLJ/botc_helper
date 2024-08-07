import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_flowergirl.png';

const flowergirl: roleType = {
    name: "Flowergirl",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Demon voted today.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "flowergirl"],
            " learned ?"]
    }
};

export default flowergirl;