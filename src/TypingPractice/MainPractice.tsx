import { ChangeEvent, KeyboardEventHandler, useRef, useState } from "react";
import words from './words';
import getRandomInt from "../utils/getRandomInt";
import './MainPractice.css';

const getNewWord = () => {
    const randomInt = getRandomInt(words.length);
    return words[randomInt];
};

type DisplayWordProps = {
    word: string;
    typedWord: string;
}

const DisplayWord = ({
    word,
    typedWord,
}: DisplayWordProps) => {
    const checkLength = Math.min(word.length, typedWord.length);
    const wordElement = [];

    for (let i = 0; i < checkLength; ++i) {
        const className = word.charAt(i) === typedWord.charAt(i) ? 'correct' : 'incorrect';
        wordElement.push(
            <span className={className} key={`${word.charAt(i)}-${i}-${className}`}>
                {word.charAt(i)}
            </span>
        )
    }

    return (
        <div className="displayWord">
            {wordElement}
            {word.substring(checkLength)}
        </div>
    )
};

const MainPractice = () => {
    const [accuracy, setAccuracy] = useState(100);
    const [curWord, setCurWord] = useState(getNewWord());
    const [typedWord, setTypedWord] = useState('');
    const [wpm, setWPM] = useState(0);
    const [wordsCompleted, setWordsCompleted] = useState(0);
    const startTime = useRef(Date.now());
    const numErrors = useRef(0);
    const lettersTyped = useRef(0);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newTypedWord = e.target.value;
        
        if (curWord === newTypedWord) {
            lettersTyped.current += curWord.length;
            setCurWord(getNewWord());
            setTypedWord('');
            setWordsCompleted(wordsCompleted + 1);
            const now = Date.now();
            const timeDiff = (now - startTime.current) / (1000 * 60);
            setWPM(wordsCompleted / timeDiff);
            setAccuracy(Math.floor((lettersTyped.current - numErrors.current) * 100 / lettersTyped.current + 0.5));
        } else {
            setTypedWord(newTypedWord);
        }
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code !== 'Backspace') {
            if (`Key${curWord.charAt(typedWord.length).toUpperCase()}` !== e.code) {
                numErrors.current++;
            }
        }
    };

    return (
        <div>
            <div>Accuracy: {accuracy}%</div>
            <div>
                Words Per Minute: {wpm.toFixed(2)}
            </div>
            <DisplayWord word={curWord} typedWord={typedWord} />
            <input onChange={onChange} onKeyDown={onKeyDown} value={typedWord} />
        </div>
    );
};

export default MainPractice;