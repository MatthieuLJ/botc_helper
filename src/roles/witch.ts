import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_witch.png';

const witch: roleType = {
    name: "Witch",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: if they nominate tomorrow, they " +
        "die. If just 3 players live, you lose this ability.",

    actions: {
        "Picks": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "witch"],
            " cursed ", [TagTypes.Player, -1]]
    }
};

export default witch;