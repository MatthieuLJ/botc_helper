import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_oracle.png';

const oracle: roleType = {
    name: "Oracle",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn how many dead players are evil.",

    actions: {
        "Learn": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "oracle"],
            " learned a ?"]
    }
};

export default oracle;