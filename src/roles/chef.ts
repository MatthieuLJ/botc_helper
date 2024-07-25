import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_chef.png';

const chef: roleType = {
    name: "Chef",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "You start knowing how many pairs of evil players there are.",

    actions: {
        "Learn": {
            start: (time: gameTime) => { },
            tapPlayer: (index: number) => { },
            tapCharacter: (index: number) => { },
            stop: () => { }
        }
    }
};

export default chef;