import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_monk.png';

const monk: roleType = {
    name: "Monk",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, choose a player (not yourself): they are safe from "
        + "the Demon tonight.",

    actions: {
        "Protect": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default monk;