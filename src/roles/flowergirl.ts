import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_flowergirl.png';

const flowergirl: roleType = {
    name: "Flowergirl",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn if a Demon voted today.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default flowergirl;