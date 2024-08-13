import { type Dispatch, HTMLInputTypeAttribute, HTMLProps, useReducer, useState } from "react";
import useInterval from "../utils/useInterval";
import './ColorCycle.css';

type ColorName = 'red' | 'green' | 'blue' | 'increment';

type CurrentColors = {
  red?: number;
  green?: number;
  blue?: number;
  startingRed?: number;
  startingGreen?: number;
  startingBlue?: number;
  increment?: number;
};

type InitialStatePayload = {
  red?: number;
  green?: number;
  blue?: number;
  increment?: number;
  name: ColorName;
};

type ColorAction =
  | { type: 'changeInitialState', payload: InitialStatePayload }
  | { type: 'resetToStart' }
  | { type: 'increment' };

const reducer = (state: CurrentColors, actions: ColorAction) => {
  switch (actions.type) {
    case 'changeInitialState':
      if (actions.payload.increment) {
        return {
          ...state,
          increment: actions.payload.increment,
        };
      } else if (actions.payload.name) {
        return {
          ...state,
          [actions.payload.name]: actions.payload[actions.payload.name],
          [`starting${actions.payload.name.toUpperCase()}`]: actions.payload[actions.payload.name]
        }
      }
      if (actions.payload.hasOwnProperty('red')) {
        return {
          ...state,
          red: actions.payload.red,
          startingRed: actions.payload.red,
        };
      } else if (actions.payload.hasOwnProperty('green')) {
        return {
          ...state,
          green: actions.payload.green,
          startingGreen: actions.payload.green,
        };
      } else if (actions.payload.hasOwnProperty('blue')) {
        return {
          ...state,
          blue: actions.payload.blue,
          startingBlue: actions.payload.blue,
        };
      } else {
        return {
          ...state,
          increment: actions.payload.increment,
        }
      }
    case 'resetToStart':
      return {
        ...state,
        red: state.startingRed,
        green: state.startingGreen,
        blue: state.startingBlue,
      }
    case 'increment':
      return {
        ...state,
        red: ((state.red || 0) + (state.increment || 0)) % 256,
        green: ((state.green || 0) + (state.increment || 0)) % 256,
        blue: ((state.blue || 0) + (state.increment || 0)) % 256,
      }
  }
};

type ColorFieldProps = {
  disabled: boolean;
  displayName: string;
  name: string;
  value: number;
  dispatch?: Dispatch<ColorAction>;
};

const ColorField = ({ disabled, displayName, name, value, dispatch }: ColorFieldProps) => {
  const props: HTMLProps<HTMLInputElement> = {};
  if (name !== 'increment' && !name.startsWith('starting')) {
    props.max = 255;
    props.min = 0;
  }
  return (
  <>
    <label htmlFor={name}>{displayName}: </label>
    <input {...props} disabled={disabled} name={name} type="number" value={value} onChange={
      (e) => {
        if (!disabled) {
          dispatch?.({
            type: 'changeInitialState',
            // @ts-expect-error maybe there's a better way to get the typing to work with this
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
  const [state, dispatch] = useReducer<(state: CurrentColors, actions: ColorAction) => CurrentColors>(reducer, {
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
      dispatch({ type: 'increment' })
    }
  }, 250);

  const changeableProps = {
    disabled: incrementing,
    dispatch,
  };

  return (
    <div className="colorContainers">
      <div className="fieldContainer">
        <ColorField displayName="Red" name="red" value={startingRed || 0} {...changeableProps} />
        <ColorField displayName="Green" name="green" value={startingGreen || 0} {...changeableProps} />
        <ColorField displayName="Blue" name="blue" value={startingBlue || 0} {...changeableProps} />
        <ColorField displayName="Increment" name="increment" value={increment || 0} {...changeableProps} />
      </div>
      <div>
        <div className="currentFieldContainer">
          <ColorField disabled displayName="Current Red" name="curRed" value={red || 0} />
          <ColorField disabled displayName="Current Green" name="curGreen" value={green || 0} />
          <ColorField disabled displayName="Current Blue" name="curBlue" value={blue || 0} />
        </div>
        <div>
          Current Color:
          <div className="colorBox" style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }} />
        </div>
        <button onClick={() => {
          setIncrementing((prevState) => !prevState);
          dispatch({ type: 'resetToStart' })
        }}>
          {incrementing ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default ColorCycle;