import { gameTime } from "./gameTime.ts";

enum CharacterType {
    Townsfolk,
    Outsider,
    Traveler,
    Minion,
    Demon
}

interface role {
    name: string;
    icon: string;
    type: CharacterType;
    ability: string;
    actions: {
        [action: string]: {
            start: (time: gameTime) => void, // start
            tapPlayer: (index: number) => void, // tapPlayer
            tapCharacter: (index: number) => void, // tapCharacter
            stop: (bool) => void // stop
        }
    };
}

export type { role as roleType };
export { CharacterType };