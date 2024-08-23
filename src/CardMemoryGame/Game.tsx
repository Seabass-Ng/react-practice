import { useRef, useState } from "react";
import getRandomInt from "../utils/getRandomInt";
import './CardMemoryGame.css';

type Props = {
    rows: number;
};

type GameInternalProps = Props & {
    board: (number | null)[];
};

const twoDIndexToIndex = (rows: number, row: number, col: number) => row * rows + col;
const indexTo2DIndex = (rows: number, index: number) => ({
    row: Math.floor(index / rows),
    col: index % rows,
});

const getFillBoard = (rows: number) => {
    const board: (number | null)[] = [];
    let numSize = Math.floor(rows * rows / 2);
    const check: { [key: number]: number } = {};
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < rows; ++j) {
            // Don't fill the center cell for odd rows and columns
            if (rows % 2 === 1 && i === j && i === Math.floor(rows / 2)) {
                board[twoDIndexToIndex(rows, i, j)] = null;
                continue;
            }
            let newRandom = getRandomInt(numSize);
            while (check[newRandom] && check[newRandom] >= 2) {
                newRandom = getRandomInt(numSize);
            }
            board[twoDIndexToIndex(rows, i, j)] = newRandom;
            if (check[newRandom]) {
                check[newRandom] += 1;
            } else {
                check[newRandom] = 1;
            }
        }
    }
    return board;
};

const GameInternal = ({
    rows,
    board,
}: GameInternalProps) => {
    const [showStatus, setShowStatus] = useState(new Array())
    return (
        <div className="gameLayout" style={{ gridTemplateColumns: `repeat(${rows}, 70px)` }}>
            {
                (new Array(rows)).fill(0).map((_, rowIndex) =>
                    (new Array(rows)).fill(0).map((_, colIndex) => (
                        <div
                            className="card"
                            key={rowIndex * rows + colIndex}
                        >
                            {board[twoDIndexToIndex(rows, rowIndex, colIndex)]}
                        </div>
                    ))
                )
            }
        </div>
    );
};


const Game = ({
    rows
}: Props) => {
    const board = useRef(getFillBoard(rows));
    return (
        <GameInternal board={board.current} rows={rows} />
    );
};

export default Game;
