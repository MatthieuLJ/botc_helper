import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_nodashii.png';

const nodashii: roleType = {
    name: "No Dashii",
    icon: img,
    type: CharacterType.Demon,
    ability: "ach night*, choose a player: they die. Your 2 Townsfolk " +
        "neighbors are poisoned.",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "No Dashii"],
            " killed player ", [EventTypes.Player, -1]]
    }
};

export default nodashii;