export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

//for each row create new array from Height Width and fill it with another array, zero represents clean cell where are no briks
export const createStage = () =>
    Array.from(Array(STAGE_HEIGHT),() => 
        new Array(STAGE_WIDTH).fill([0,'clear'])
    )

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => {
    for(let y = 0; y < player.tetromino.length; y += 1){
        //we use tetromino[0] as rows have the same length
        for(let x = 0; x < player.tetromino[y].length; x += 1){
            // looping tetromino, checking if we are on tetromino cell and zero don't make up the shape of tetramino
            //check that we are on an actual tetromino cell
            if (player.tetromino[y][x] !== 0){
                if(
                //check that our move is inside the game areas height(y)
                //make sure we didn't go through the bottom of the play area
                !stage[y + player.pos.y + moveY] ||
                //check that our move is inside the game areas width(x)
                !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
                //check if cell we are moving to is not set to clear
                stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
                ){
                    return true;
                }
            }
        }
    }
};
