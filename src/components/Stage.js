import React from "react";
import { StyledStage } from "./styles/StyledStage";

import Cell from "./Cell";


const Stage = ({stage}) => (
//this will set our cells in rectangle
    <StyledStage width={stage[0].length} height={stage.length}>
{/* create stage and stage map where we get row and array that holds the cells; for each cell we render our cell component  */}
        {stage.map( row => row.map((cell, x)=> <Cell key={x} type={cell[0]}/>))}
    </StyledStage>
)

export default Stage;