import React from "react";
import Cell from "./Cell";

const Stage = ({stage}) => (
    <div>
//create stage and stage map where we get row and array that holds the cells; for each cell we render our cell component 
        {stage.map( row => row.map((cell, x)=> <Cell key={x} type={cell[0]}/>))}
    </div>
)

export default Stage;