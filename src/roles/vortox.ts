import { ChipType } from '../state/NotesSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_vortox.png';

const vortox: roleType = {
    name: "Vortox",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player, they die. Townsfolk abilities " +
        "yield false info. Each day, if no-one is executed, evil wins.",
    action: ["On", [ChipType.Time, -1], ", player ",
        [ChipType.Player, -1], " as the ", [ChipType.Role, "Vortox"],
        " killed player ", [ChipType.Player, -1]]
};

export default vortox;