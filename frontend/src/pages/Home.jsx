import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleNavigate = (type, operation) => {
    navigate("/compute", {
      state: { type, operation },
    });
  };

  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl mb-6">Choose an Operation</h1>

      <div className="grid grid-cols-2 gap-10">

        {/* Matrix Operations */}
        <div>
          <h2 className="text-xl mb-3">Matrix Operations</h2>
          <table className="w-full border border-gray-600">
            <tbody>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("matrix", "add")}
              >
                <td className="p-3 border">Addition</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("matrix", "subtract")}
              >
                <td className="p-3 border">Subtraction</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("matrix", "multiply")}
              >
                <td className="p-3 border">Multiplication</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("matrix", "transpose")}
              >
                <td className="p-3 border">Transpose</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Linear Algebra */}
        <div>
          <h2 className="text-xl mb-3">Linear Algebra</h2>
          <table className="w-full border border-gray-600">
            <tbody>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "determinant")}
              >
                <td className="p-3 border">Determinant</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "rank")}
              >
                <td className="p-3 border">Rank</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "trace")}
              >
                <td className="p-3 border">Trace</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "inverse")}
              >
                <td className="p-3 border">Inverse</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "eigen")}
              >
                <td className="p-3 border">Eigenvalues & Eigenvectors</td>
              </tr>

              <tr
                className="hover:bg-gray-700 cursor-pointer"
                onClick={() => handleNavigate("la", "solve")}
              >
                <td className="p-3 border">Solve Linear Equation</td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Home;