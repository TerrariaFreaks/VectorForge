import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MatrixInput from "../components/MatrixInput.jsx";

const OPERATION_CONFIG = {
  add: { matrices: 2 },
  subtract: { matrices: 2 },
  multiply: { matrices: 2 },

  determinant: { matrices: 1 },
  inverse: { matrices: 1 },
  rank: { matrices: 1 },
  trace: { matrices: 1 },
  eigen: { matrices: 1 },
  transpose: { matrices: 1 },

  solve: { matrices: 2 }, // ✅ linear system
};

function Compute() {
  const location = useLocation();
  const { operation } = location.state || {};

  const config = OPERATION_CONFIG[operation] || { matrices: 1 };

  const isSolve = operation === "solve";

  // Matrix A
  const [matrixA, setMatrixA] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  // Matrix B (or vector b for solve)
  const [matrixB, setMatrixB] = useState(
    isSolve
      ? [[""], [""], [""]] // column vector
      : [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]
  );

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl mb-6 capitalize">
        Operation: {operation || "None Selected"}
      </h1>

      <div className="flex gap-10 flex-wrap">

        {/* Matrix A */}
        <MatrixInput
          matrix={matrixA}
          setMatrix={setMatrixA}
          label={isSolve ? "Matrix A (Coefficients)" : "Matrix A"}
        />

        {/* Matrix B OR Vector b */}
        {config.matrices === 2 && (
          <MatrixInput
            matrix={matrixB}
            setMatrix={setMatrixB}
            label={isSolve ? "Vector b" : "Matrix B"}
            fixedCols={isSolve ? 1 : undefined} // 🔥 optional prop if you implement it
          />
        )}

      </div>
    </div>
  );
}

export default Compute;