import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { TETROMINOS } from "../tetrominos"; 

const Cell = ({type}) => (
    //when we created TETRAMINOS we have shape property and color
    <StyledCell type={type} color={TETROMINOS[type].color}/>
    //add rerender console log for debugging purposes
    // <StyledCell type={type} color={TETROMINOS[type].color}>console.log("rerender");</StyledCell>
    //for debug pupposes lets use 'L' and 'cell' string into the cell
    // <StyledCell type={'L'} color={TETROMINOS['L'].color}>cell</StyledCell>
)

//memo will memorizes cell component and only rerenders when the cells actually are changeing
export default React.memo(Cell);
