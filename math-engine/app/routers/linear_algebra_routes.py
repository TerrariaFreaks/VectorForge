from fastapi import HTTPException, APIRouter
from app.models.linear_algebra_schemas import MatrixRequest
from app.operations.linear_algebra_ops import determinant, inverse, rank, trace, eigen

router = APIRouter()

@router.post('/determinant')
def det(request: MatrixRequest):
    try:
        result = determinant(request.matrix)
        return {"result": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/inverse')
def inv(request: MatrixRequest):
    try:
        result = inverse(request.matrix)
        return {"result": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/rank')
def rank_matrix(request: MatrixRequest):
    result = rank(request.matrix)
    return {"result": result}

@router.post('/trace')
def trace_matrix(request: MatrixRequest):
    try:
        result = trace(request.matrix)
        return {"result": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post("/eigen")
def find_eigen(request: MatrixRequest):
    try:
        result = eigen(request.matrix)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))