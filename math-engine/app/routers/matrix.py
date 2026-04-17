from fastapi import APIRouter, HTTPException
from app.models.schemas import MatrixMultiplyRequest, MatrixAddRequest, MatrixTransposeRequest, MatrixSubRequest, MatrixScalarMulRequest
from app.operations.matrix_ops import multiply_matrices, add_matrices, transpose_matrix, subtract_matrices, scalar_multiply

router = APIRouter()

@router.post('/multiply')
def multiply(request: MatrixMultiplyRequest):
    try:
        result = multiply_matrices(request.matrixA, request.matrixB)
        return {"result" : result}
    except ValueError as e:
        raise HTTPException(status_code = 400, detail=str(e))
    

@router.post('/add')
def add(request: MatrixAddRequest):
    try:
        result = add_matrices(request.matrixA, request.matrixB)
        return {"result": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post('/transpose')
def transpose(request: MatrixTransposeRequest):
    result = transpose_matrix(request.matrix)
    return {"result" : result}

@router.post('/subtract')
def subtract(request: MatrixSubRequest):
    try:
        result = subtract_matrices(request.matrixA, request.matrixB)
        return {"result": result}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.post('/scalar-multiply')
def scalar_mul(request: MatrixScalarMulRequest):
    result = scalar_multiply(request.matrix, request.scalarK)
    return {"result": result}  
    

    
    
