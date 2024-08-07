import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_imp.png';

const imp: roleType = {
    name: "Imp",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. If you kill yourself " +
        "this way, a Minion becomes the Imp.",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "Imp"],
            " killed player ", [EventTypes.Player, -1]]
    }
};

export default imp;