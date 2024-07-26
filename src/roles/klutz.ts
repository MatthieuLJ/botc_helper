import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_klutz.png';

const klutz: roleType = {
    name: "Klutz",
    icon: img,
    type: CharacterType.Outsider,
    ability: "When you learn that you died, publicly choose 1 alive player: " +
        "if they are evil, your team loses.",

    actions: {
        "Picks": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default klutz;