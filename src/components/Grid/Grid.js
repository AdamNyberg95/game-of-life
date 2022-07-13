import React, { useState, useCallback, useRef } from "react";
import produce from "immer";
import "../Grid/Grid.css";

import ControlPad from "../ControlPad/ControlPad";
import {
  numRows,
  numCols,
  operations,
  generateEmptyGrid,
} from "../../utils/grid-helpers";

const Grid = () => {
  const [grid, setGrid] = useState(generateEmptyGrid);

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const addLivingBox = (i, k) => {
    const newGrid = produce(grid, (gridCopy) => {
      gridCopy[i][k] = grid[i][k] ? 0 : 1;
    });
    setGrid(newGrid);
  };

  /**
   *  Control Pad Handlers
   */
  const runSimulationHandler = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const randomizeHandler = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows[i] = [];
      for (let j = 0; j < numCols; j++) {
        rows[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }

    setGrid(rows);
  };

  const resetHandler = () => {
    setGrid(generateEmptyGrid());
  };

  /**
   *  Main simulation function
   */
  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    setTimeout(runSimulation, 200);
  }, []);

  /**
   * UI
   */
  return (
    <div>
      <ControlPad
        runSimulationHandler={runSimulationHandler}
        randomizeHandler={randomizeHandler}
        resetHandler={resetHandler}
        running={running}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
          justifyContent: "center",
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              className=""
              key={`${i}-${k}`}
              onClick={() => {
                addLivingBox(i, k);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "green" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
