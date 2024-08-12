import { type Dispatch, useReducer, useState } from "react";
import useInterval from "./useInterval";

type ColorName = 'red' | 'green' | 'blue' | 'increment';

type CurrentColors = {
  red: number;
  green: number;
  blue: number;
  startingRed: number;
  startingGreen: number;
  startingBlue: number;
  increment: number;
};

type InitialStatePayload = {
  red?: number;
  green?: number;
  blue?: number;
  increment?: number;
  name: ColorName;
};

type Action =
  | { type: 'changeInitialState', payload: InitialStatePayload }
  | { type: 'increment' };

const reducer = (state: CurrentColors, action: Action) => {
  switch (action.type) {
    case 'changeInitialState':
      if (action.payload.increment) {
        return {
          ...state,
          increment: action.payload.increment,
        };
      } else if (action.payload.name) {
        return {
          ...state,
          [action.payload.name]: action.payload[action.payload.name],
          [`starting${action.payload.name.toUpperCase()}`]: action.payload[action.payload.name]
        }
      }
      if (action.payload.hasOwnProperty('red')) {
        return {
          ...state,
          red: action.payload.red,
          startingRed: action.payload.red,
        };
      } else if (action.payload.hasOwnProperty('green')) {
        return {
          ...state,
          green: action.payload.green,
          startingGreen: action.payload.green,
        };
      } else if (action.payload.hasOwnProperty('blue')) {
        return {
          ...state,
          blue: action.payload.blue,
          startingBlue: action.payload.blue,
        };
      } else {
        return {
          ...state,
          increment: action.payload.increment,
        }
      }
    case 'increment':
      return {
        ...state,
        red: (state.red + state.increment) % 256,
        green: (state.green + state.increment) % 256,
        blue: (state.blue + state.increment) % 256,
      }
  }
};

type ColorFieldProps = {
  disabled: boolean;
  displayName: string;
  name: ColorName;
  value: number;
  dispatch?: Dispatch<Action>;
};

const ColorField = ({ disabled, displayName, name, value, dispatch }: ColorFieldProps) => {
  
  return (
  <>
    <label htmlFor="">{displayName}: </label>
    <input disabled={disabled} name={name} type="number" value={value} onChange={
      (e) => {
        if (!disabled) {
          dispatch?.({
            type: 'changeInitialState',
            payload: {
              [name]: parseInt(e.target.value, 10),
            },
          });
        }
      }
    } />
  </>
);
};

const ColorCycle = () => {

  const [state, dispatch] = useReducer(reducer, {
    red: 0,
    green: 0,
    blue: 0,
    increment: 0,
    startingRed: 0,
    startingGreen: 0,
    startingBlue: 0,
  });
  const [incrementing, setIncrementing] = useState(false);

  const { red, green, blue, increment, startingRed, startingGreen, startingBlue } = state;

  useInterval(() => {
    if (incrementing) {
      dispatch()
    }
  }, 250);

  return (
    <div className="colorContainers">
      <div className="fieldContainer">
        <ColorField disabled={incrementing} displayName="Red" name="red" value={startingRed} setValue={setStartingRed} />
        <ColorField disabled={incrementing} displayName="Green" name="green" value={startingGreen} setValue={setStartingGreen} />
        <ColorField disabled={incrementing} displayName="Blue" name="blue" value={startingBlue} setValue={setStartingBlue} />
        <ColorField disabled={incrementing} displayName="Increment" name="increment" value={increment} setValue={ } />
      </div>
      <div>
        <div>
          <ColorField disabled displayName="Current Red" name="curRed" value={red} />
          <ColorField disabled displayName="Current Green" name="curGreen" value={green} />
          <ColorField disabled displayName="Current Blue" name="curBlue" value={blue} />
        </div>
        <div>
          Current Color:
          <div className="colorBox" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
        </div>
        <button onClick={() => setIncrementing((prevState) => !prevState)}>
          {incrementing ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default ColorCycle;