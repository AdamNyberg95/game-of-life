import "../ControlPad/ControlPad.css";

const ControlPad = ({
  runSimulationHandler,
  randomizeHandler,
  resetHandler,
  running,
}) => {
  return (
    <div className="buttonContainer">
      <button className="button" onClick={runSimulationHandler}>
        {running ? "stop" : "start"}
      </button>
      <button className="button" onClick={randomizeHandler}>
        random
      </button>
      <button className="button" onClick={resetHandler}>
        reset
      </button>
    </div>
  );
};

export default ControlPad;
