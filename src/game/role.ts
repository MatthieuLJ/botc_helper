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
        [action: string]: [
            (time: gameTime) => void, // start
            (index: number) => void, // tapPlayer
            (index: number) => void, // tapCharacter
            () => void // stop
        ]
    };
}

export type { role as roleType };
export { CharacterType };