import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_vortox.png';

const vortox: roleType = {
    name: "Vortox",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player, they die. Townsfolk abilities " +
        "yield false info. Each day, if no-one is executed, evil wins.",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "Vortox"],
            " killed player ", [EventTypes.Player, -1]]
    }
};

export default vortox;