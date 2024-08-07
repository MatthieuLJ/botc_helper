
import { Event } from "./EventsSlice.tsx";

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
        [action: string]: Event;
    }
}

export type { role as roleType };
export { CharacterType };