import React, {useState} from "react";

//we use this to have clean stage at the beggining of the game and we have useStage hook also
import { createStage } from "../gameHelpers";
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
    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player);
    //this will confirm re-renders in browser console for debug purposes
    console.log('re-render');

    //dir is for direction
    const movePlayer = dir => {
        updatePlayerPos({x: dir, y: 0});
    };

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
    };

    const drop = () => {
        updatePlayerPos({x: 0, y: 1, collided: false})
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({keyCode}) => {
        if(!gameOver){
            //37 stands for left, 39 for right, 40 is down  error on the keyboard
            if(keyCode === 37){
                movePlayer(-1);
            } else if (keyCode === 39){
                movePlayer(1);
            } else if (keyCode === 40){
                dropPlayer();
            }
        }
    };

    return(
        //width and higth of the complete window where we take key inputs like div that is now visible but it cover all screen and register
        //any key (mouse) press
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
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
                    <StartButton callback={startGame}/>
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    );
};

export default Tetris;
