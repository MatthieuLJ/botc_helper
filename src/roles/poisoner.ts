import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_poisoner.png';

const poisoner: roleType = {
    name: "Poisoner",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: they are poisoned tonight and " +
        "tomorrow day.",

    actions: {
        "Poison": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "poisoner"],
            " poisoned ", [EventTypes.Player, -1]]
    }
};

export default poisoner;