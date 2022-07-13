export const numRows = 30;
export const numCols = 30;

export const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows[i] = [];
    for (let j = 0; j < numCols; j++) {
      rows[i][j] = 0;
    }
  }

  return rows;
};
