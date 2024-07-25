import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_sage.png';

const sage: roleType = {
    name: "Sage",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "If the Demon kills you, you learn that it is 1 of 2 players.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default sage;