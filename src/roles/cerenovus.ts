import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_cerenovus.png';

const cerenovus: roleType = {
    name: "Cerenovus",
    icon: img,
    type: CharacterType.Minion,
    ability: 'Each night, choose a player & a good character: they are "mad"' +
        ' they are this character tomorrow, or might be executed.',

    actions: {
        "MakeMad": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "cerenovus"],
            " chose player ", [EventTypes.Player, -1], " to be mad as the ",
            [EventTypes.Role, ""]]
    }
};

export default cerenovus;