import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import MatrixInput from "../components/MatrixInput.jsx";
import axios from "axios";

const OPERATION_CONFIG = {
  add: { matrices: 2, returnsMatrix: true },
  subtract: { matrices: 2, returnsMatrix: true },
  multiply: { matrices: 2, returnsMatrix: true },
  transpose: { matrices: 1, returnsMatrix: true },
  inverse: { matrices: 1, returnsMatrix: true },
  determinant: { matrices: 1, returnsMatrix: false },
  rank: { matrices: 1, returnsMatrix: false },
  trace: { matrices: 1, returnsMatrix: false },
  eigen: { matrices: 1, returnsMatrix: false },
  solve: { matrices: 2, returnsMatrix: false },
};

const API_MAP = {
  add: "/api/math/add-matrices",
  subtract: "/api/math/subtract-matrices",
  multiply: "/api/math/mul-matrices",
  transpose: "/api/math/transpose-matrix",
  inverse: "/api/linear-algebra/find-inverse",
  determinant: "/api/linear-algebra/find-determinant",
  rank: "/api/linear-algebra/find-rank",
  trace: "/api/linear-algebra/find-trace",
  eigen: "/api/linear-algebra/find-eigen",
  solve: "/api/linear-algebra/solve-linear-equation",
};

function ResultPanel({ result, operation }) {
  const config = OPERATION_CONFIG[operation];
  const r = result?.result ?? result;

  if (!result) return null;

  // --- SOLVE ---
  if (operation === "solve") {
    return (
      <div className="bg-gray-800 p-6 rounded-xl min-w-[260px] shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Result</h2>
        {r?.solution ? (
          <div className="flex flex-col gap-3">
            {r.solution.map((val, i) => (
              <div key={i} className="bg-gray-700 px-4 py-3 rounded text-center">
                <span className="block text-sm text-gray-400">x{i + 1}</span>
                <span className="text-lg font-semibold">{Number(val).toFixed(4)}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-red-400 mb-3 font-medium">No solution exists</div>
        )}
        {r?.explanation && (
          <p className="text-gray-400 mt-4 text-sm">{r.explanation}</p>
        )}
      </div>
    );
  }

  // --- MATRIX RESULT (add, subtract, multiply, transpose, inverse) ---
  if (config?.returnsMatrix) {
    const matrix = Array.isArray(r) ? r : r?.matrix ?? r;
    if (!matrix || !Array.isArray(matrix)) return null;

    return (
      <div className="bg-gray-800 p-6 rounded-xl min-w-[260px] shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Result</h2>
        <div className="flex flex-col gap-2">
          {matrix.map((row, i) => (
            <div key={i} className="flex gap-2">
              {(Array.isArray(row) ? row : [row]).map((val, j) => (
                <div
                  key={j}
                  className="bg-gray-700 px-4 py-3 rounded text-center min-w-[60px]"
                >
                  <span className="text-lg font-semibold">
                    {typeof val === "number" ? val.toFixed(4) : val}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- EIGEN ---
  // --- EIGEN ---
if (operation === "eigen") {
  const eigenvalues = r?.eigenvalues ?? r?.values;
  const eigenvectors = r?.eigenvectors ?? r?.vectors;
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl mb-5 font-semibold">Result</h2>

      <div className="flex gap-6 items-start">

        {/* Eigenvalues - left */}
        {eigenvalues && (
          <div>
            <p className="text-gray-400 text-sm mb-2">Eigenvalues</p>
            <div className="bg-gray-700 px-5 py-3 rounded flex flex-col gap-3">
              {eigenvalues.map((val, i) => (
                <div key={i} className="text-center">
                  <span className="block text-xs text-gray-400 mb-1">λ{i + 1}</span>
                  <span className="text-lg font-semibold">
                    {typeof val === "number" ? val.toFixed(4) : JSON.stringify(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Eigenvectors - right */}
        {eigenvectors && (
          <div>
            <p className="text-gray-400 text-sm mb-2">Eigenvectors</p>
            <div className="flex gap-3">
              {eigenvectors.map((vec, i) => (
                <div key={i} className="bg-gray-700 rounded px-4 py-3 flex flex-col items-center gap-2">
                  <span className="text-xs text-gray-400">v{i + 1}</span>
                  {(Array.isArray(vec) ? vec : [vec]).map((v, j) => (
                    <span key={j} className="font-semibold text-sm">
                      {typeof v === "number" ? v.toFixed(4) : JSON.stringify(v)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

  // --- SCALAR (determinant, rank, trace) ---
  const scalarValue =
    typeof r === "number"
      ? r
      : r?.value ?? r?.determinant ?? r?.rank ?? r?.trace;

  if (scalarValue !== undefined && scalarValue !== null) {
    const label =
      operation === "determinant" ? "Determinant" :
      operation === "rank" ? "Rank" :
      operation === "trace" ? "Trace" : "Result";

    return (
      <div className="bg-gray-800 p-6 rounded-xl min-w-[260px] shadow-lg">
        <h2 className="text-xl mb-4 font-semibold">Result</h2>
        <div className="bg-gray-700 px-6 py-5 rounded text-center">
          <span className="block text-sm text-gray-400 mb-1">{label}</span>
          <span className="text-2xl font-bold">
            {typeof scalarValue === "number" ? scalarValue.toFixed(4) : scalarValue}
          </span>
        </div>
        {r?.explanation && (
          <p className="text-gray-400 mt-4 text-sm">{r.explanation}</p>
        )}
      </div>
    );
  }

  // --- FALLBACK ---
  return (
    <div className="bg-gray-800 p-6 rounded-xl min-w-[260px] shadow-lg">
      <h2 className="text-xl mb-4 font-semibold">Result</h2>
      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
        {JSON.stringify(r, null, 2)}
      </pre>
    </div>
  );
}

function Compute() {
  const location = useLocation();
  const { operation } = location.state || {};
  const config = OPERATION_CONFIG[operation] || { matrices: 1 };
  const isSolve = operation === "solve";

  const [matrixA, setMatrixA] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  const [matrixB, setMatrixB] = useState(
    isSolve
      ? [[""], [""], [""]]
      : [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ]
  );

  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const parseMatrix = (matrix) =>
    matrix.map((row) => row.map((val) => (val === "" ? 0 : Number(val))));

  const handleSolve = async () => {
    setError(null);
    setResult(null);
    try {
      const url = API_MAP[operation];
      const token = localStorage.getItem("token");

      let payload;
      if (operation === "solve") {
        payload = {
          matrixA: parseMatrix(matrixA),
          matrixb: parseMatrix(matrixB),
          method: "auto",
        };
      } else if (config.matrices === 2) {
        payload = {
          matrixA: parseMatrix(matrixA),
          matrixB: parseMatrix(matrixB),
        };
      } else {
        payload = { matrix: parseMatrix(matrixA) }; // ✅ fixed
      }

      const res = await axios.post(`http://localhost:5000${url}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <div className="p-10 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl mb-6 capitalize">
        Operation: {operation || "None Selected"}
      </h1>

      <div className="flex gap-12 items-start">
        <div className="flex flex-col gap-6">
          <div className="flex gap-10 flex-wrap">
            <MatrixInput
              matrix={matrixA}
              setMatrix={setMatrixA}
              label={isSolve ? "Matrix A (Coefficients)" : "Matrix A"}
            />
            {config.matrices === 2 && (
              <MatrixInput
                matrix={matrixB}
                setMatrix={setMatrixB}
                label={isSolve ? "Vector b" : "Matrix B"}
              />
            )}
          </div>

          <button
            onClick={handleSolve}
            className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded w-fit"
          >
            Solve
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {result && <ResultPanel result={result} operation={operation} />}
      </div>
    </div>
  );
}

export default Compute;