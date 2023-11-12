import React, {useState} from "react";

//we use this to have clean stage at the beggining of the game and we have useStage hook also
import { createStage, checkCollision } from "../gameHelpers";
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
    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);
    //this will confirm re-renders in browser console for debug purposes
    console.log('re-render');

    //dir is for direction
    const movePlayer = dir => {
        //check the collision when we move the player down, 
        //if we don't collide we send in the player the stage and the intended position we wnat to move
        //or simply to say if we are not colliding with anything we do the move
        if (!checkCollision(player, stage, {x: dir, y: 0})){
            updatePlayerPos({x: dir, y: 0});
        }
    };

    const startGame = () => {
        //reset everything
        setStage(createStage());
        resetPlayer();
        setGameOver(false);
    };

    const drop = () => {
        //check if collision when drop
        if (!checkCollision(player, stage, {x: 0, y: 1})){
            updatePlayerPos({x: 0, y: 1, collided: false})
        } else{
          //when droping and collide with something we need to set collided property to true
          //when collide (when we drop) we know that this tetraminor should be merged to the stage 
          //because we can't drop further after collision, also when colliding with up it should be game over
          if(player.pos.y < 1){
            console.log("GAME OVER!");
            setGameOver(true);
            setDropTime(null)
          }
          updatePlayerPos({x: 0, y: 0, collided: true});
        }
    };

    const dropPlayer = () => {
        drop();
    };

    const move = ({keyCode}) => {
        if(!gameOver){
            //37 stands for left, 39 for right, 40 is down, 38is up error on the keyboard
            if(keyCode === 37){
                movePlayer(-1);
            } else if (keyCode === 39){
                movePlayer(1);
            } else if (keyCode === 40){
                dropPlayer();
            } else if (keyCode === 38){
                playerRotate(stage, 1);
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
