# 🚀 FailureSense  
### Intelligent Predictive Maintenance & Risk-Aware Decision Support System

FailureSense is an end-to-end machine learning system designed to predict industrial machine failures and translate probabilistic outputs into actionable maintenance decisions.

This project demonstrates production-oriented ML engineering practices including calibrated classification, recall-first threshold tuning, modular inference pipelines, API deployment, and a full-stack dashboard interface.

---

## 🎯 Problem Statement

Industrial machines generate continuous sensor telemetry, but failures are rare and costly. Traditional rule-based monitoring systems:

- Miss early failure signals  
- Produce high false alarms  
- Lack explainability  
- Provide no structured decision support  

FailureSense addresses this by combining statistical learning with operational risk logic.

---

## 🧠 System Design

FailureSense operates in **two clearly separated stages**:

---

### 🟢 Stage 1 — Failure Probability Estimation

- Champion Model: **Gradient Boosting Classifier**
- Probability calibration applied
- Optimized for **rare-event recall**
- Cost-sensitive threshold tuning
- Outputs calibrated failure probability

This stage answers:

> “How likely is this machine to fail?”

---

### 🟡 Stage 2 — Operational Risk Intelligence

Stage 2 transforms statistical probability into decision support:

- Sensor anomaly detection  
- Stress score computation  
- Risk stratification: **LOW / MEDIUM / HIGH**  
- Human-readable explanation  
- Actionable maintenance recommendation  

This stage answers:

> “What does this mean operationally, and what should we do?”

The separation between prediction and decision logic ensures modularity, interpretability, and maintainability.

---

## 🏗 System Architecture

React Frontend (Vite)
↓
FastAPI Backend
↓
Production Inference Pipeline (src/)
↓
Calibrated Model Artifacts (models/)


### Architecture Principles

- Clear separation between UI, API, and ML logic  
- Model artifacts versioned independently  
- Business logic decoupled from statistical prediction  
- REST-based communication between frontend and backend  
- Scalable structure suitable for containerization  

---

## 📦 Project Structure


### Architecture Principles

- Clear separation between UI, API, and ML logic  
- Model artifacts versioned independently  
- Business logic decoupled from statistical prediction  
- REST-based communication between frontend and backend  
- Scalable structure suitable for containerization  

---

## 📦 Project Structure

src/
inference.py # Production inference logic
preprocessing.py # Input transformation & feature handling
stage2_logic.py # Risk intelligence and explanation engine

models/
calibrated_gb.pkl
screening_threshold.pkl

frontend/
React dashboard (Vite)

app.py # FastAPI backend
requirements.txt
README.md


---

## 🔌 API Specification

### Endpoint


### Request Body

```json
{
  "air_temp": 298.5,
  "process_temp": 308.2,
  "rotational_speed": 1500,
  "torque": 42.3,
  "tool_wear": 120,
  "machine_type": "M"
}
{
  "risk_score": 0.8421,
  "risk_level": "HIGH",
  "abnormal_sensors": {
    "high_tool_wear": true,
    "high_torque": true,
    "high_temp_diff": false
  },
  "explanation": "High torque and elevated tool wear indicate increased mechanical stress.",
  "recommendation": "Schedule immediate inspection and preventive maintenance."
}


## Technology Stack
### Backend

Python

scikit-learn

FastAPI

joblib

### Frontend

React

Vite

### Version Control

Git / GitHub


Running Locally
Backend
pip install -r requirements.txt
python -m uvicorn app:app --reload


Backend runs at:

http://127.0.0.1:8000


API documentation available at:

http://127.0.0.1:8000/docs


Frontend
cd frontend
npm install
npm run dev


Frontend runs at:

http://localhost:5173


Key Engineering Decisions

Explicit separation of statistical prediction and decision logic

Recall-first optimization for industrial safety sensitivity

Calibrated probabilities for reliable interpretation

Modular inference pipeline under src/

Clean REST API contract

🚧 Future Improvements

Public cloud deployment

Docker containerization

Automated test coverage

Monitoring and model drift detection

Logging and observability layer

📄 License

This project is developed for educational and portfolio demonstration purposes.