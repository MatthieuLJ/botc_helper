import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_vigormortis.png';

const vigormortis: roleType = {
    name: "Vigormortis",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. Minions you kill keep " +
        "their ability & poison 1 Townsfolk neighbor. [-1 Outsider]",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "Vogormortis"],
            " killed player ", [EventTypes.Player, -1]]
    }
};

export default vigormortis;