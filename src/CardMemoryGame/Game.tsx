import { useRef, useState } from "react";
import classnames from "../utils/classnames";
import getRandomInt from "../utils/getRandomInt";
import './CardMemoryGame.css';


type Props = {
    onFinish: () => void;
    rows: number;
};

type boardCell = {
    value: number | null;
    flipped: boolean;
};

type GameInternalProps = Props & {
    board: boardCell[];
};

const twoDIndexToIndex = (rows: number, row: number, col: number) => row * rows + col;

const getFillBoard = (rows: number) => {
    const board: boardCell[] = [];
    let numSize = Math.floor(rows * rows / 2);
    const check: { [key: number]: number } = {};
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < rows; ++j) {
            // Don't fill the center cell for odd rows and columns
            if (rows % 2 === 1 && i === j && i === Math.floor(rows / 2)) {
                board[twoDIndexToIndex(rows, i, j)] = {
                    value: null,
                    flipped: true,
                };
                continue;
            }
            let newRandom = getRandomInt(numSize);
            while (check[newRandom] && check[newRandom] >= 2) {
                newRandom = getRandomInt(numSize);
            }
            board[twoDIndexToIndex(rows, i, j)] = {
                value: newRandom,
                flipped: false,
            };
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
    onFinish,
}: GameInternalProps) => {
    const [curBoard, setCurBoard] = useState(board);
    const [showCards, setShowCards] = useState<number[]>([]);

    const areWeDone = () => curBoard.filter(board => !board.flipped).length === 0;

    const onCardClick = (index: number) => {
        if (curBoard[index].flipped) {
            return;
        }
        if (showCards.length === 0) {
            setShowCards([ index ]);
        } else if (showCards.length === 1) {
            if (index === showCards[0]) {
                setShowCards([]);
            } else {
                if (curBoard[showCards[0]].value === curBoard[index].value) {
                    const newBoard = curBoard;
                    newBoard[showCards[0]].flipped = true;
                    newBoard[index].flipped = true;
                    setCurBoard(newBoard);
                    setShowCards([]);
                    if (areWeDone()) {
                        onFinish();
                    }
                } else {
                    setShowCards([ ...showCards, index]);
                    setTimeout(() => {
                        setShowCards([]);
                    }, 1000);
                }
            }
        }
    };

    return (
        <div className="gameLayout" style={{ gridTemplateColumns: `repeat(${rows}, 70px)` }}>
            {
                (new Array(rows)).fill(0).map((_, rowIndex) =>
                    (new Array(rows)).fill(0).map((_, colIndex) => {
                        const curIndex = twoDIndexToIndex(rows, rowIndex, colIndex);
                        const curCell = curBoard[curIndex];
                        const showCardValue = curCell.flipped || showCards[0] === curIndex || showCards[1] === curIndex;
                        return (
                            <button
                                className={classnames('card', curCell.value === null && 'noValue', curCell.flipped && 'flipped')}
                                disabled={curCell.flipped}
                                onClick={() => onCardClick(curIndex)}
                                key={rowIndex * rows + colIndex}
                            >
                                {showCardValue ? curCell.value : ' '}
                            </button>
                        );
                    })
                )
            }
        </div>
    );
};


const Game = ({
    onFinish,
    rows
}: Props) => {
    const board = useRef(getFillBoard(rows));
    return (
        <GameInternal board={board.current} onFinish={onFinish} rows={rows} />
    );
};

export default Game;
