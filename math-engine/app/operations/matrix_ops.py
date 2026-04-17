import numpy as np

def multiply_matrices(matrixA, matrixB):

    A = np.array(matrixA)
    B = np.array(matrixB)

    if A.shape[1] != B.shape[0]:
        raise ValueError("Invalid matrix dimensions for multiplication")

    res = np.matmul(A, B)

    return res.tolist()

def add_matrices(matrixA, matrixB):
    A = np.array(matrixA)
    B = np.array(matrixB)
    if A.shape != B.shape:
        raise ValueError("Invalid dimension for matrix addition, dimensions must be same for both matrices")
    res = np.add(A, B)

    return res.tolist()

def transpose_matrix(matrix):
    A = np.array(matrix)

    res = A.T

    return res.tolist()

def subtract_matrices(matrixA, matrixB):
    A = np.array(matrixA)
    B = np.array(matrixB)

    
    if A.shape != B.shape:
        raise ValueError("Invalid dimension for matrix subtraction, dimensions should be same")
    res = A - B

    return res.tolist()

def scalar_multiply(matrix, scalarK):
    A = np.array(matrix)
    res = A * scalarK

    return res.tolist()

    
        
