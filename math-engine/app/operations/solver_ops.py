METHOD_INFO = {
    "direct": {
        "name": "Direct Solve",
        "description": "Solves Ax = b using Gaussian elimination",
        "requirements": "Square, full-rank matrix",
        "stability": "High",
        "use_case": "Exact solutions",
        "limitations": "Fails for singular matrices"
    },
    "least_squares": {
        "name": "Least Squares",
        "description": "Finds approximate solution minimizing error",
        "requirements": "Any matrix",
        "stability": "High",
        "use_case": "Regression, ML",
        "limitations": "Solution is approximate"
    },
    "inverse": {
        "name": "Inverse Method",
        "description": "Computes x = A⁻¹b",
        "requirements": "Square, invertible matrix",
        "stability": "Low",
        "use_case": "Theoretical understanding",
        "limitations": "Numerically unstable"
    }
}

import numpy as np

def solve_linear_system(A, b, method="auto"):
    A = np.array(A)
    b =  np.array(b).reshape(-1, 1)

    Ab = np.hstack([A, b])

    rank_A = np.linalg.matrix_rank(A)
    rank_Ab = np.linalg.matrix_rank(Ab)

    n = A.shape[1]

    solution_type = None
    explanation = None

    if rank_A == rank_Ab == n:
        solution_type = "unique"
        explanation = "Matrix is full rank so a unique solution exists"

    elif rank_A == rank_Ab < n:
        solution_type = "infinite"
        explanation = "System has infinitely many solutions"

    else:
        return {
            "solution_type": "none",
            "method_used": None,
            "solution": None,
            "explanation": "System is inconsistent (no solution exists)"
        }

    if method == "auto":
        method = "direct" if solution_type == "unique" else "least_squares"

    try:
        if method == "direct":
            x = np.linalg.solve(A, b)

        elif method == "least_squares":
            x, *_ = np.linalg.lstsq(A, b, rcond=None)

        elif method == "inverse":
            inv = np.linalg.inv(A)
            x = inv @ b
        else:
            return {"error": "Invalid method selected"}
    except Exception as e:
        return {
            "error": f"{method} method failed",
            "suggested_method": "least_squares",
            "reason": str(e)
        }

    return {
        "solution_type": solution_type,
        "method_used": method,
        "solution": x.flatten().tolist(),
        "method_info": METHOD_INFO.get(method),
        "explanation": explanation
    }                