import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_vigormortis.png';

const vigormortis: roleType = {
    name: "Vigormortis",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. Minions you kill keep " +
        "their ability & poison 1 Townsfolk neighbor. [-1 Outsider]",

    actions: {
        "Kill": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default vigormortis;