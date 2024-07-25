import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_undertaker.png';

const undertaker: roleType = {
    name: "Undertaker",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night*, you learn which character died by execution today.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default undertaker;