import { useState } from "react";
import useInterval from "../utils/useInterval";

enum ERRORS {
    NO_NAME = 'Missing name',

};

const validateName = (name: string) => name ? '' : ERRORS.NO_NAME;
const validateDate = 

const CountdownTimer = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const []
    useInterval(() => {

    }, 1);
};