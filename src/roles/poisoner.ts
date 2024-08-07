import { TagTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_poisoner.png';

const poisoner: roleType = {
    name: "Poisoner",
    icon: img,
    type: CharacterType.Minion,
    ability: "Each night, choose a player: they are poisoned tonight and " +
        "tomorrow day.",

    actions: {
        "Poison": ["On", [TagTypes.Time, -1], ", player ",
            [TagTypes.Player, -1], " as the ", [TagTypes.Role, "poisoner"],
            " poisoned ", [TagTypes.Player, -1]]
    }
};

export default poisoner;