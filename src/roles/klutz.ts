import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_klutz.png';

const klutz: roleType = {
    name: "Klutz",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you learn that you died, publicly choose 1 alive player: " +
        "if they are evil, your team loses.",

    actions: {
        "Picks": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "klutz"],
            " picked ", [TagTypes.Player, -1]]
    }
};

export default klutz;