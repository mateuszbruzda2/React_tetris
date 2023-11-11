import { useCallback, useState } from "react";

import { randomTetramino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH } from "../gameHelpers";

//it is important to have use in const otherwise react won't know that this is a custom hook, 

export const usePlayer = () =>{
//useState will return an array with two items where es6 destructing will grab values    
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
//call a function to grab shape from tetrominos.js     
        tetromino: TETROMINOS[0].shape,
        collided: false,
    });

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
    return [player, updatePlayerPos, resetPlayer];

//without destructor
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1];
}
