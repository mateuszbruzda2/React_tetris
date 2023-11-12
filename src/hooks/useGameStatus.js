import { useCallback, useState, useEffect } from "react";

export const useGameStatus = rowsCleared =>{
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    //scores from wikipedia
    const linePoints = [40, 100, 300, 1200];

    //without callbavk this would go into infinity loop, here it will change every render
    const calcScore = useCallback(() => {
        if(rowsCleared > 0){
            setScore(prev => prev + linePoints[rowsCleared -1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared])

    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score]);

    return [score, setScore, rows, setRows, level, setLevel];
};
