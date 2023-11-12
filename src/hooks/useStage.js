import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
//inside useState give initial stage by createStage (clean board for a game)    
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);
        //function with stage and reduce method can create new array so we can check if the row contains any zero
        //if it does it will not be cleared 
        //but when it will have complete row it will create the illusion that we remove the row on the stage
        //by adding a row to our rows cleared state than a complete empy row will be added at the top of the array
        //Change the loop for sweepRows 
        //Instead of using setRowsCleared inside the loop I used a counter and when the loop is finished I updated the state. 
        const sweepRows = newStage => {
            let rowsDeleted = 0;
      
            const stg = newStage.reduce((acc, row) => {
              // console.log(newStage);
              if (row.findIndex(cell => cell[0] === 0) === -1) {
                // Row is full
                rowsDeleted++;
                acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                return acc;
              }
              acc.push(row);
              return acc;
            }, []);
      
      
            setRowsCleared(rowsDeleted);
            return stg;
          }

        const updateStage = prevStage => {
            //flush the state before it will set to merge, this is why we know we should keep it in the stage because it has collided
            //otherwise it's set to clear and then we can just delete it in next render
            const newStage = prevStage.map(row =>
                //values are from gameHelper.js, if we do not get clear cell it will return cell and it will stay in the stage
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

                //draw the tetramino (that was provided in player state), looping through tetromino, 
                // check which cells are occupied to know the shape
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if(value !== 0){
                        if (
                            newStage[y + player.pos.y] &&
                            newStage[y + player.pos.y][x + player.pos.x]
                          ){
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            //this is how we know we should clear tetraminor in next render if we set it to merge we know it has colided
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];}
                    }
                });
            });
            //because when we have the new stage with updated position we than check if we collided
            if(player.collided){
                resetPlayer();
                //as the sweepRows returns complete new stage it is needed to be also returned after collision with this newStage
                return sweepRows(newStage);
            }
            //because we are not returning any collisions yet we have to return newStage
            return newStage;

        };

        setStage(prev => updateStage(prev));
    //after debugging it shows that this cause dissapearing the bricks when it ramdomly choose the same brick as previous
    // }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);
    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};
