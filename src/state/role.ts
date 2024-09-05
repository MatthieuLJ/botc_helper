
import { NoteSegments } from "./NotesSlice.tsx";

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
    action: NoteSegments;
}

export type { role as roleType };
export { CharacterType };