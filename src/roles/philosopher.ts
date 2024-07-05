import { roleType, CharacterType } from '../game/role.ts';
import { gameTime } from "../game/gameTime.ts";

const philosopher: roleType = {
    name: "Philosopher",
    icon: "icon_philosopher.png",
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose a good character: gain that " +
        "ability. If this character is in play, they are drunk.",

    actions: {
        "GainAbility": [
            (time: gameTime) => { }, // start
            (index: number) => { },  // tapPlayer
            (index: number) => { },  // tapCharacter
            () => { }                // stop
        ]
    }
};

export default philosopher;