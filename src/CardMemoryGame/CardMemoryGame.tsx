import { useState } from "react";
import Game from "./Game";
import Intro from "./Intro";
import Congratulation from "./Congratulation";

enum STEPS {
    INTRO = 'Intro',
    GAME = 'Game',
    CONGRATS = 'CONGRATS',
};

const CardMemoryGame = () => {
    const [step, setStep] = useState(STEPS.INTRO);
    const [totalRows, setTotalRows] = useState<number | null>(null);

    switch (step) {
        case STEPS.INTRO:
            return <Intro startGame={
                (rows: number) => {
                    setTotalRows(rows);
                    setStep(STEPS.GAME)
                }
            } />;
        case STEPS.GAME:
            return (
                <Game
                    onFinish={() => setStep(STEPS.CONGRATS)}
                    rows={totalRows || 2}
                />
            );
        case STEPS.CONGRATS:
            return <Congratulation startOver={() => setStep(STEPS.INTRO)} />
    }
};

export default CardMemoryGame;