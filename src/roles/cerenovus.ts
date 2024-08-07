import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_cerenovus.png';

const cerenovus: roleType = {
    name: "Cerenovus",
    icon: img,
    type: CharacterType.Minion,
    ability: 'Each night, choose a player & a good character: they are "mad"' +
        ' they are this character tomorrow, or might be executed.',

    actions: {
        "MakeMad": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "cerenovus"],
            " chose player ", [TagTypes.Player, -1], " to be mad as the ",
            [TagTypes.Role, ""]]
    }
};

export default cerenovus;