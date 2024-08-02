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
            start: () => void, // start
            tapPlayer: (index: number) => void, // tapPlayer
            tapCharacter: (role: string) => void, // tapCharacter
            tapTime: (time: number) => void, // tapTime
            stop: (bool) => void // stop
        }
    };
}

export type { role as roleType };
export { CharacterType };