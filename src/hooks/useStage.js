import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetPlayer) => {
//inside useState give initial stage by createStage (clean board for a game)    
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
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
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            //this is how we know we should clear tetraminor in next render if we set it to merge we know it has colided
                            //
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            //because when we have the new stage with updated position we than check if we collided
            if(player.collided){
                resetPlayer();
            }

            //because we are not returning any collisions yet we have to return newStage
            return newStage;

        };

        setStage(prev => updateStage(prev));
    //after debugging it shows that this cause dissapearing the bricks when it ramdomly choose the same brick as previous
    // }, [player.collided, player.pos.x, player.pos.y, player.tetromino]);
    }, [player, resetPlayer]);

    return [stage, setStage];
};
