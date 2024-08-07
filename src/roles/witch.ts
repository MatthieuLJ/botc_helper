import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_witch.png';

const witch: roleType = {
    name: "Witch",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: if they nominate tomorrow, they " +
        "die. If just 3 players live, you lose this ability.",

    actions: {
        "Picks": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "witch"],
            " cursed ", [EventTypes.Player, -1]]
    }
};

export default witch;