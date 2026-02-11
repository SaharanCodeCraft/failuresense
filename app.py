from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os

from fastapi.middleware.cors import CORSMiddleware
from src.inference import predict_failure_sense

# --------------------------------------------------
# App initialization
# --------------------------------------------------
app = FastAPI(
    title="FailureSense API",
    description="Predictive maintenance decision-support system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Load model artifacts ONCE at startup
# --------------------------------------------------
PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")

calibrated_model = joblib.load(
    os.path.join(MODELS_DIR, "calibrated_gb.pkl")
)
screening_threshold = joblib.load(
    os.path.join(MODELS_DIR, "screening_threshold.pkl")
)

# --------------------------------------------------
# Request schema
# --------------------------------------------------
class PredictRequest(BaseModel):
    air_temp: float
    process_temp: float
    rotational_speed: int
    torque: float
    tool_wear: int
    machine_type: str   # "L", "M", or "H"

# --------------------------------------------------
# Prediction endpoint
# --------------------------------------------------
@app.post("/predict")
def predict(request: PredictRequest):
    """
    Run FailureSense prediction and decision support.
    """

    result = predict_failure_sense(
        calibrated_model=calibrated_model,
        screening_threshold=screening_threshold,
        air_temp=request.air_temp,
        process_temp=request.process_temp,
        rotational_speed=request.rotational_speed,
        torque=request.torque,
        tool_wear=request.tool_wear,
        machine_type=request.machine_type
    )

    return result
