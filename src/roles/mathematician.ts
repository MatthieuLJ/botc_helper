import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_mathematician.png';

const mathematician: roleType = {
    name: "Mathematician",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, you learn how many players' abilities worked " +
        "abnormally (since dawn) due to another character's ability.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "mathematician"],
            " learned a ?"]
    }
};

export default mathematician;