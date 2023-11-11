import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos"; 

const Cell = ({type}) => (
    //when we created TETRAMINOS we have shape property and color
    <StyledCell type={type} color={TETROMINOS[type].color}/>
    //for debug pupposes lets use 'L' and 'cell' string into the cell
    // <StyledCell type={'L'} color={TETROMINOS['L'].color}>cell</StyledCell>
)

export default Cell;
