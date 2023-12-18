import { useReducer } from "react";
import Display from "./Display";

const ADDINPUT = "ADD_INPUT";
const CALCULATE = "CALCULATE";
const CLEAR = "CLEAR";
const DELETE = "DELETE";
const operators = ["+", "-", "/", "*"];

const Calculator = () => {
    const initialState = {
        inputs: "",
        result: "",
    };

    const reducer = (state = initialState, action) => {
        switch (action.type) {
            case ADDINPUT: {
                let addOperator = true;

                if (
                    (operators.includes(action.payload) &&
                        operators.includes(state.inputs.slice(state.inputs.length - 1, state.inputs.length))) ||
                    action.payload === "0"
                ) {
                    addOperator = false;
                } else {
                    addOperator = true;
                }
                if (addOperator) {
                    return { ...state, inputs: state.inputs + action.payload };
                }
                return { ...state };
            }

            case CALCULATE: {
                const inputLength = state.inputs.length;
                if (!operators.includes(state.inputs.slice(inputLength - 1, inputLength))) {
                    try {
                        const result = eval(state.inputs);
                        if (!Number.isFinite(result)) {
                            throw new Error("Cannot divide by zero");
                        }
                        const newInput = { ...state, result: result.toString(), inputs: state.result };
                        console.log(newInput.result);
                        return { ...state, result: "", inputs: newInput.result };
                    } catch (err) {
                        console.log(err);
                    }
                } else {
                    try {
                        return { ...state, inputs: eval(state.inputs.slice(0, inputLength - 1)).toString(), result: "" };
                    } catch (err) {
                        console.log(err);
                    }
                }
            }

            case CLEAR: {
                return { ...state, inputs: "", result: "" };
            }

            case DELETE: {
                return { ...state, inputs: state.inputs.slice(0, state.inputs.length - 1) };
            }

            default:
                return state;
        }
    };

    const handleInputs = (value) => {
        dispatch({ type: ADDINPUT, payload: value });
    };

    const handleCalculate = () => {
        dispatch({ type: CALCULATE });
    };

    const handleClear = () => {
        dispatch({ type: CLEAR });
    };

    const handleDelete = () => {
        dispatch({ type: DELETE });
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);

    return (
        <div id="calculator">
            <Display inputs={state.inputs} />
            <div className="button-container">
                <button onClick={handleClear} id="clearBtn">
                    AC
                </button>
                <button onClick={handleDelete}>Del</button>
                <button onClick={() => handleInputs("+")}>+</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("1")}>1</button>
                <button onClick={() => handleInputs("2")}>2</button>
                <button onClick={() => handleInputs("3")}>3</button>
                <button onClick={() => handleInputs("-")}>-</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("4")}>4</button>
                <button onClick={() => handleInputs("5")}>5</button>
                <button onClick={() => handleInputs("6")}>6</button>
                <button onClick={() => handleInputs("*")}>*</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs("7")}>7</button>
                <button onClick={() => handleInputs("8")}>8</button>
                <button onClick={() => handleInputs("9")}>9</button>
                <button onClick={() => handleInputs("/")}>/</button>
            </div>
            <div className="button-container">
                <button onClick={() => handleInputs(".")}>.</button>
                <button onClick={() => handleInputs("0")}>0</button>
                <button onClick={handleCalculate} id="calcBtn">
                    =
                </button>
            </div>
        </div>
    );
};

export default Calculator;
