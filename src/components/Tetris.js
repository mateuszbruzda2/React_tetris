import React, {useState} from "react";

//this is not needed as we use our useStage hook now
// import { createStage } from "../gameHelpers";
//styled components
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

//custom hooks
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

 //Components
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

const Tetris = () => {
    //this will show arrays in browser console for debug purposes
    //console.log(createStage());
    //state 'dropTime' with speed that bricks are falling depending of level of the game and 'gameOver' with true/false
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    //custom hooks
    const [player] = usePlayer();
    const [stage, setStage] = useStage(player);
    //this will confirm re-renders in browser console for debug purposes
    console.log('re-render');

    return(
        <StyledTetrisWrapper>
            <StyledTetris>
                <Stage stage={stage}/>
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over"/>
                    ) : (
                    // this will not be displayed when game over
                    <div>
                        <Display text={"Score"}/>
                        <Display text={"Rows"}/>
                        <Display text={"Level"}/>
                    </div>
                    )}
                    <StartButton/>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
