import { ChangeEvent, ReducerAction, ReducerState, useReducer, useState } from "react";
import './BorderRadiusPreviewer.css';

type ReducerState = {
  bottomLeft: number;
  bottomRight: number;
  radius: number;
  topLeft: number;
  topRight: number;
};

type ReducerAction = {
  payload: number;
  type: string;
};

const reducer = (state: ReducerState, action: ReducerAction) => {
  switch (action.type) {
    case 'topLeft':
      return {
        ...state,
        topLeft: action.payload,
      };
    case 'topRight':
      return {
        ...state,
        topRight: action.payload,
      };
    case 'bottomLeft':
      return {
        ...state,
        bottomLeft: action.payload,
      };
    case 'bottomRight':
      return {
        ...state,
        bottomRight: action.payload,
      };
    default:
      return {
        radius: action.payload,
        topLeft: action.payload,
        topRight: action.payload,
        bottomLeft: action.payload,
        bottomRight: action.payload,
      };
  }
};

type Types = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
const types: Types[] = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];

const BorderRadiusPreviewer = () => {
  const [state, dispatch] =
    useReducer(reducer, { bottomLeft: 0, bottomRight: 0, radius: 0, topLeft: 0, topRight: 0 });
  const { radius, topLeft, topRight, bottomLeft, bottomRight } = state;

  const typeToTitle = (type: string) => {
    let secondIndex = type.indexOf('L');
    if (secondIndex === -1) {
      secondIndex = type.indexOf('R');
    }
    return `${type.charAt(0).toUpperCase()}${type.substring(1, secondIndex)} ${type.charAt(secondIndex).toUpperCase()}${type.substring(secondIndex + 1)}`;
  }

  const borderRadius = `${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px`;

  return (
    <div className="previewBody">
      <h3>Border Radius Previewer</h3>
      <div className="preview" style={{ borderRadius }} />
      <label htmlFor="all">
        All Radius:
      </label>
      <input
        inputMode="numeric"
        name="all"
        type="number"
        min={0}
        step={1}
        onChange={
          (e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: 'radius', payload: parseInt(e.target.value, 10) || 0 })
        }
        value={radius}
      />

      {types.map((type: Types) => (
        <>
          <label htmlFor={type}>
            {typeToTitle(type)}:
          </label>
          <input
            inputMode="numeric"
            name={type}
            type="number"
            min={0}
            step={1}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({ type, payload: parseInt(e.target.value, 10) || 0 })
            }
            value={state[type]}
          />
        </>
      ))}

      <div>border-radius: {borderRadius}</div>
    </div>
  );
};

export default BorderRadiusPreviewer;