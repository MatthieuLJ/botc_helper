import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_imp.png';

const imp: roleType = {
    name: "Imp",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player: they die. If you kill yourself " +
        "this way, a Minion becomes the Imp.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default imp;