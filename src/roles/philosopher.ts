import { ChipType } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_philosopher.png';

const philosopher: roleType = {
    name: "Philosopher",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose a good character: gain that " +
        "ability. If this character is in play, they are drunk.",

    actions: {
        "GainAbility": ["On", [ChipType.Time, -1], ", player ",
            [ChipType.Player, -1], " as the ", [ChipType.Role, "philosopher"],
            " gained the ability of ", [ChipType.Role, ""]]
    }
};

export default philosopher;