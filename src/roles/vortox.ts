import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";
import img from './images/icon_vortox.png';

const vortox: roleType = {
    name: "Vortox",
    icon: img,
    type: CharacterType.Demon,
    ability: "Each night*, choose a player, they die. Townsfolk abilities " +
        "yield false info. Each day, if no-one is executed, evil wins.",

    actions: {
        "Kill": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default vortox;