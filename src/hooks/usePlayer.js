import { useState } from "react";

import { randomTetramino } from "../tetrominos";

//it is important to have use in const otherwise react won't know that this is a custom hook, 

export const usePlayer = () =>{
//useState will return an array with two items where es6 destructing will grab values    
    const [player, setPlayer] = useState({
        pos: {x: 0, y: 0},
//call a function to grab shape from tetrominos.js     
        tetromino: randomTetramino().shape,
        collided: false,
    });
//return player that will be importet by hook into tetris component
    return [player];

//without destructor
    // const playerState = useState();
    // const player = playerState[0];
    // const setPlayer = playerState[1];
}
