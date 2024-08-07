import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_klutz.png';

const klutz: roleType = {
    name: "Klutz",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you learn that you died, publicly choose 1 alive player: " +
        "if they are evil, your team loses.",

    actions: {
        "Picks": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "klutz"],
            " picked ", [EventTypes.Player, -1]]
    }
};

export default klutz;