import { type FormEvent } from "react";

type FormElements = EventTarget & {
    rows: HTMLInputElement;
};

type Props = {
    startGame: (rows: number) => void;
};

const Intro = ({
    startGame
}: Props) => {
    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        const formElements = e.target as FormElements;
        if (formElements.rows.value) {
            startGame(parseInt(formElements.rows.value, 10));
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="rows">How many rows? </label>
            <input type="number" name="rows" />
            <button type="submit">Start game</button>
        </form>
        
    );
};

export default Intro;