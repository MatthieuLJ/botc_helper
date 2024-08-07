import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_slayer.png';

const slayer: roleType = {
    name: "Slayer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "The 1st time you are nominated, if the nominator is a Townsfolk, "
        + "they are executed immediately.",

    actions: {
        "Shoot": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "slayer"],
            " shot ", [TagTypes.Player, -1]]
    }
};

export default slayer;