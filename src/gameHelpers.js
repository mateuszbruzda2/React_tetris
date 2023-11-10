export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//for each row create new array from Height Width and fill it with another array, zero represents clean cell where are no briks
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT),() => 
        new Array(STAGE_WIDTH).fill([0,'clear'])
    )
