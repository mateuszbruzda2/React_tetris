import { useState } from "react";
import { createStage } from "../gameHelpers";

export const useStage = () => {
//inside useState give initial stage by createStage (clean board for a game)    
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}
