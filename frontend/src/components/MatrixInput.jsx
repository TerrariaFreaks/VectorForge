import React, { useState } from "react";

function MatrixInput({ matrix, setMatrix, label }) {
  const [rows, setRows] = useState(matrix.length);
  const [cols, setCols] = useState(matrix[0].length);

  // Update matrix size
  const resizeMatrix = (newRows, newCols) => {
    const newMatrix = Array.from({ length: newRows }, (_, i) =>
      Array.from({ length: newCols }, (_, j) =>
        matrix[i]?.[j] ?? ""
      )
    );

    setRows(newRows);
    setCols(newCols);
    setMatrix(newMatrix);
  };

  const handleChange = (i, j, value) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[i][j] = value;
    setMatrix(newMatrix);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h2 className="mb-3 font-semibold">{label}</h2>

      {/* Controls */}
      <div className="flex gap-4 mb-4 items-center">
        
        {/* Rows */}
        <div className="flex items-center gap-2">
          <span>Rows:</span>
          <button
            onClick={() => rows > 1 && resizeMatrix(rows - 1, cols)}
            className="px-2 bg-gray-700 rounded"
          >
            -
          </button>
          <span>{rows}</span>
          <button
            onClick={() => resizeMatrix(rows + 1, cols)}
            className="px-2 bg-gray-700 rounded"
          >
            +
          </button>
        </div>

        {/* Cols */}
        <div className="flex items-center gap-2">
          <span>Cols:</span>
          <button
            onClick={() => cols > 1 && resizeMatrix(rows, cols - 1)}
            className="px-2 bg-gray-700 rounded"
          >
            -
          </button>
          <span>{cols}</span>
          <button
            onClick={() => resizeMatrix(rows, cols + 1)}
            className="px-2 bg-gray-700 rounded"
          >
            +
          </button>
        </div>

      </div>

      {/* Matrix Grid */}
      {matrix.map((row, i) => (
        <div key={i} className="flex gap-2 mb-2">
          {row.map((val, j) => (
            <input
              key={j}
              type="number"
              value={val}
              onChange={(e) => handleChange(i, j, e.target.value)}
              className="w-16 p-2 bg-gray-700 border border-gray-600 rounded text-center"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrixInput;