import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_savant.png';

const savant: roleType = {
    name: "Savant",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each day, you may visit the Storyteller to learn 2 things in " +
        "private: 1 is true & 1 is false.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default savant;