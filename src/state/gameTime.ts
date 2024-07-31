enum gamePhases {
    Night,
    Day,
    Evening
}

type gameTime = {
    phase: gamePhases,
    num: number;
};

/* for future use
export const next_time = (time: gameTime): gameTime => {
    const result: gameTime = { phase: gamePhases.Night, num: 0 };
    switch (time.phase) {
        case gamePhases.Night:
            result.phase = gamePhases.Day;
            result.num = time.num;
            break;
        case gamePhases.Day:
            result.phase = gamePhases.Evening;
            result.num = time.num;
            break;
        case gamePhases.Evening:
            result.phase = gamePhases.Night;
            result.num = time.num + 1;
            break;
    }
    return result;
};
*/

export { gameTime };