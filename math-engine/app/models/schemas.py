from pydantic import BaseModel
from typing import List

class MatrixMultiplyRequest(BaseModel):
    matrixA: List[List[float]]
    matrixB: List[List[float]]

class MatrixAddRequest(BaseModel):
    matrixA: List[List[float]]
    matrixB: List[List[float]]

class MatrixTransposeRequest(BaseModel):
    matrix: List[List[float]]

class MatrixSubRequest(BaseModel):
    matrixA : List[List[float]]
    matrixB : List[List[float]]

class MatrixScalarMulRequest(BaseModel):
    matrix : List[List[float]]
    scalarK: float