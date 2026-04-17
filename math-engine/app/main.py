from fastapi import FastAPI
from app.routers import matrix, linear_algebra_routes, solver_routes

app = FastAPI(title = "VectorForge Math Engine")

app.include_router(matrix.router, prefix='/matrix', tags=['Matrix'])
app.include_router(linear_algebra_routes.router, prefix='/linear-algebra', tags=['Linear Algebra'])
app.include_router(solver_routes.router, prefix='/linear-algebra', tags=['Linear Algebra'])

@app.get('/')
def root():
    return {"message": "VectorForge math engine is running"}