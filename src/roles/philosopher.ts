import { roleType, CharacterType } from '../state/role.ts';
import img from './images/icon_philosopher.png';

const philosopher: roleType = {
    name: "Philosopher",
    icon: img,
    type: CharacterType.Townsfolk,
    ability: "Once per game, at night, choose a good character: gain that " +
        "ability. If this character is in play, they are drunk.",

    actions: {
        "GainAbility": {
            start: () => {}, // start
            tapPlayer: (index: number) => {}, // tapPlayer
            tapCharacter: (role: string) => {}, // tapCharacter
            tapTime: (time: number) => {}, // tapTime
            stop: (bool) => {} // stop
        }
    }
};

export default philosopher;