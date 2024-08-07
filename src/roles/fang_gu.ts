import { EventTypes } from '../state/EventsSlice.tsx';
import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_fanggu.png';

const fanggu: roleType = {
    name: "Fang gu",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. The 1st Outsider this " +
        "kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",

    actions: {
        "Kill": ["On", [EventTypes.Time, -1], ", player ",
            [EventTypes.Player, -1], " as the ", [EventTypes.Role, "Fang Gu"],
            " killed player ", [EventTypes.Player, -1]]
    }
};

export default fanggu;