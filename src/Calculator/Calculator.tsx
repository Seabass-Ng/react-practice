import { ChangeEvent, useState } from "react";

enum Operator {
  ADD = 'add',
  SUBTARCT = 'subtract',
  MULTIPLY = 'multiply',
  DIVISION = 'division',
}

type StackType = {
  firstNum?: number;
  operator?: Operator;
  secondNum?: number;
};

const useCalcStack = () => {
  const [stack, setStack] = useState<StackType>({});
  const [showError, setShowError] = useState<boolean>(false);

  const isTooBig = (value: number) => {
    if (value >= 1e8) {
      setShowError(true);
      setStack({});
      return true;
    }
    return false;
  };

  const onNumTypeClick = (value: number) => {
    if (showError) {
      setShowError(false);
    }
    if (!stack.firstNum) {
      if (!isTooBig(value)) {
        setStack({
          firstNum: value,
        });
      }
    } else if (stack.secondNum) {
      const newNum = stack.secondNum * 10 + value;
      if (!isTooBig(newNum)) {
        setStack({
          ...stack,
          secondNum: newNum,
        });
      }
    } else if (stack.operator) {
      if (!isTooBig(value)) {
        setStack({
          ...stack,
          secondNum: value,
        });
      }
    } else if (stack.firstNum) {
      const newNum = stack.firstNum * 10 + value;
      if (!isTooBig(newNum)) {
        setStack({
          firstNum: newNum,
        });
      }
    }
  };

  const onOperatorClick = (operator: Operator) => {
    let result;
    if (stack.operator) {
      switch (stack.operator) {
        case Operator.ADD:
          result = (stack.firstNum || 0) + (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
              operator,
            });
          }
          break;
        case Operator.SUBTARCT:
          result = (stack.firstNum || 0) - (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
              operator,
            });
          }
          break;
        case Operator.MULTIPLY:
          result = (stack.firstNum || 0) * (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
              operator,
            });
          }
          break;
        case Operator.DIVISION:
          if ((stack.secondNum || 0) === 0) {
            setStack({});
            setShowError(true);
          } else {
            result = (stack.firstNum || 0) / (stack.secondNum || 0);
            if (!isTooBig(result)) {
              setStack({
                firstNum: result,
                operator,
              });
            }
          }
          break;
      }
    } else {
      setStack({
        ...stack,
        operator,
      });
    }
  };

  const onEqual = () => {
    if (stack.operator) {
      let result;
      switch (stack.operator) {
        case Operator.ADD:
          result = (stack.firstNum || 0) + (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
            });
          }
          break;
        case Operator.SUBTARCT:
          result = (stack.firstNum || 0) - (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
            });
          }
          break;
        case Operator.MULTIPLY:
          result = (stack.firstNum || 0) * (stack.secondNum || 0);
          if (!isTooBig(result)) {
            setStack({
              firstNum: result,
            });
          }
          break;
        case Operator.DIVISION:
          if ((stack.secondNum || 0) === 0) {
            setStack({});
            setShowError(true);
          } else {
            result = (stack.firstNum || 0) / (stack.secondNum || 0);
            if (!isTooBig(result)) {
              setStack({
                firstNum: result,
              });
            }
          }
          break;
      }
    }
  };

  const clear = () => {
    setStack((prevStack) => {
      if (prevStack.secondNum || prevStack.operator) {
        return {
          ...prevStack,
          secondNum: undefined,
        };
      }
      return {};
    });
    setShowError(false);
  }

  const fullClear = () => {
    setStack({});
    setShowError(false);
  };

  let displayNum = 0;
  if (stack.secondNum) {
    displayNum = stack.secondNum;
  } else if (stack.firstNum) {
    displayNum = stack.firstNum;
  }

  return {
    clear,
    fullClear,
    displayNum,
    onEqual,
    onNumTypeClick,
    onOperatorClick,
    showError,
  };
};

const Calculator = () => {
  const { clear, displayNum, fullClear, onEqual, onNumTypeClick, onOperatorClick, showError } = useCalcStack();
  return (
    <div className="flexbox">
      <input className="screen" readOnly value={showError ? 'ERR' : displayNum} />
      <div className="flexColumn">
        <input type="button" value="C" onClick={clear} />
        <input type="button" value="AC" onClick={fullClear} />
      </div>
      <div className="flexColumn">
        <input type="button" value="+" onClick={() => onOperatorClick(Operator.ADD)} />
        <input type="button" value="-" onClick={() => onOperatorClick(Operator.SUBTARCT)} />
        <input type="button" value="*" onClick={() => onOperatorClick(Operator.MULTIPLY)} />
        <input type="button" value="/" onClick={() => onOperatorClick(Operator.DIVISION)} />
        <input type="button" value="=" onClick={onEqual} />
      </div>
      <div className="flexColumn">
        <input type="button" value="0" onClick={() => onNumTypeClick(0)} />
        <input type="button" value="1" onClick={() => onNumTypeClick(1)} />
        <input type="button" value="2" onClick={() => onNumTypeClick(2)} />
        <input type="button" value="3" onClick={() => onNumTypeClick(3)} />
        <input type="button" value="4" onClick={() => onNumTypeClick(4)} />
        <input type="button" value="5" onClick={() => onNumTypeClick(5)} />
        <input type="button" value="6" onClick={() => onNumTypeClick(6)} />
        <input type="button" value="7" onClick={() => onNumTypeClick(7)} />
        <input type="button" value="8" onClick={() => onNumTypeClick(8)} />
        <input type="button" value="9" onClick={() => onNumTypeClick(9)} />
      </div>
    </div>
  );
};

export default Calculator;