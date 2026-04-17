import numpy as np

def determinant(matrix):
    A = np.array(matrix)

    if A.shape[0] != A.shape[1]:
        raise ValueError("Invalid dimension, only square (n x n) matrices are allowed")
    res = np.linalg.det(A)

    return float(f"{res:.6g}")

def inverse(matrix):
    A = np.array(matrix)

    if A.shape[0] != A.shape[1]:
        raise ValueError("Invalid dimension, only square (n x n) matrices are allowed")
    det = np.linalg.det(A)
    if abs(det) < 1e-10:
        raise ValueError("Determinant 0, cannot calculate inverse")
    
    res = np.linalg.inv(A)

    return [[(float)(f"{val:.6g}") for val in row] for row in res.tolist()]

def rank(matrix):
    A = np.array(matrix)

    r = np.linalg.matrix_rank(A)

    return int(r)

def trace(matrix):
    A = np.array(matrix)
    
    if A.shape[0] != A.shape[1]:
        raise ValueError("Matrix must be square to calculate trace")
    
    res = np.trace(A)

    return float(res)

def format_number(val):
    if isinstance(val, complex) or np.iscomplexobj(val):
        if abs(val.imag) < 1e-10:
            return round(val.real, 6)
        else:
            return {
                "real": round(val.real, 6),
                "imag": round(val.imag, 6)
            }
    else:
        return round(float(val), 6)

def eigen(matrix):
    A = np.array(matrix)
    if A.shape[0] != A.shape[1]:
        raise ValueError("Matrix must be square to calculate eigenvalue")
    
    values, vectors = np.linalg.eig(A)

    eigenvalues = [format_number(val) for val in values]

    eigenvectors = [
        [format_number(v) for v in vec]
        for vec in vectors.tolist()
    ]

    return {
        "eigenvalues" : eigenvalues,
        "eigenvectors" : eigenvectors
    }


    

    
