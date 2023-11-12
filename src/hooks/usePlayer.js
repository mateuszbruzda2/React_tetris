import { useCallback, useState } from "react";

import { randomTetramino, TETROMINOS } from "../tetrominos";
import { checkCollision, STAGE_WIDTH } from "../gameHelpers";

//it is important to have use in const otherwise react won't know that this is a custom hook, 

export const usePlayer = () =>{
//useState will return an array with two items where es6 destructing will grab values    
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
//call a function to grab shape from tetrominos.js     
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

    const rotate = (matrix, dir) => {
        //make the rows to become columns (transpose)
        const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]),
        );
        //reverse each row to get a rotated matrix
        if(dir > 0) return rotatedTetro.map(row => row.reverse());
        return rotatedTetro.reverse();
    };

    const playerRotate = (stage, dir) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

        //this will solve problem that bricks after rotate move outside game border
        const pos = clonedPlayer.pos.x;
        let offset = 1;
        while(checkCollision(clonedPlayer, stage, {x: 0, y: 0})){
            clonedPlayer.pos.x += offset;
            //when rotate if collision on left it will move on right, if collision on right it will move on left
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino[0].length){
                rotate(clonedPlayer.tetromino, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({x, y, collided}) => {
        setPlayer(prev => ({
            ...prev,
            pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)}, 
            collided,
        }));
    };

    //without useCallback we will end with infinity loop
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
            tetromino: randomTetramino().shape,
            collided: false,
        });
    }, []);

//return player that will be importet by hook into tetris component
    return [player, updatePlayerPos, resetPlayer, playerRotate];

//without destructor
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1];
}
