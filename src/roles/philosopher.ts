import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_philosopher.png';

const philosopher: roleType = {
    name: "Philosopher",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose a good character: gain that " +
        "ability. If this character is in play, they are drunk.",

    actions: {
        "GainAbility": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "philosopher"],
            " gained the ability of ", [EventTypes.Role, ""]]
    }
};

export default philosopher;