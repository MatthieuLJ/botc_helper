import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_vortox.png';

const vortox: roleType = {
    name: "Vortox",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player, they die. Townsfolk abilities " +
        "yield false info. Each day, if no-one is executed, evil wins.",

    actions: {
        "Kill": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "Vortox"],
            " killed player ", [TagTypes.Player, -1]]
    }
};

export default vortox;