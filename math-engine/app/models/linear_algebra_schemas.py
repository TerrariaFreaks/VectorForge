from pydantic import BaseModel
from typing import List

class MatrixRequest(BaseModel):
    matrix: List[List[float]]

class LinearEquationSolver(BaseModel):
    matrixA: List[List[float]]
    matrixb: List[List[float]]
    method: str = "auto" # default behaviour