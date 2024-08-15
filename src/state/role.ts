
import { EventSegments } from "./EventsSlice.tsx";

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
        [action: string]: EventSegments;
    }
}

export type { role as roleType };
export { CharacterType };