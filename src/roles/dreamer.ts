import { roleType, CharacterType } from '../state/role.ts';
import { gameTime } from "../state/gameTime.ts";
import img from './images/icon_dreamer.png';

const dreamer: roleType = {
    name: "Dreamer",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Each night, choose a player (not yourself or Travellers): you " +
        "learn 1 good & 1 evil character, 1 of which is correct.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default dreamer;