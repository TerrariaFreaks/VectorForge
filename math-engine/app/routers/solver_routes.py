from fastapi import HTTPException, APIRouter
from app.models.linear_algebra_schemas import LinearEquationSolver
from app.operations.solver_ops import solve_linear_system

router = APIRouter()

@router.post('/solve')
def solve(request: LinearEquationSolver):
    try:
        result = solve_linear_system(request.matrixA, request.matrixb, method=request.method)
        if "error" in result:
            raise HTTPException(status_code=400, detail=result)
        return {"result" : result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))