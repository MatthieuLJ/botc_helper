import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_snakecharmer.png';

const snake_charmer: roleType = {
    name: "Snake Charmer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose an alive player: a chosen Demon swaps " +
        "characters & alignments with you & is then poisoned.",

    actions: {
        "Picks": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default snake_charmer;