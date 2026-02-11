from src.preprocessing import build_input_dataframe
from src.stage2_logic import (
    detect_abnormal_sensors,
    compute_stress_score,
    determine_risk_level,
    generate_explanation,
    recommend_action
)

def predict_failure_sense(
    calibrated_model,
    screening_threshold,
    air_temp,
    process_temp,
    rotational_speed,
    torque,
    tool_wear,
    machine_type
):
    """
    Production inference function for FailureSense.

    risk_score = Probability of machine FAILURE (class = 0)
    """

    # -------------------------------
    # Build model input
    # -------------------------------
    input_df = build_input_dataframe(
        air_temp,
        process_temp,
        rotational_speed,
        torque,
        tool_wear,
        machine_type
    )

    # -------------------------------
    # FIX: Risk score semantics
    # -------------------------------
    # predict_proba[:, 1] = probability of NO failure
    # We want probability of FAILURE

    # Probability of FAILURE (class = 1)
    risk_score = calibrated_model.predict_proba(input_df)[0, 1]


    # -------------------------------
    # Stage-2 logic
    # -------------------------------
    abnormal = detect_abnormal_sensors(input_df.iloc[0])
    stress_score = compute_stress_score(abnormal)

    screened_in = (
    risk_score >= screening_threshold or stress_score >= 2
    )
    
    if screened_in:
        risk_level = determine_risk_level(risk_score, stress_score)
        explanation = generate_explanation(
            input_df.iloc[0], abnormal, risk_level
        )
        recommendation = recommend_action(risk_level, abnormal)
    else:
        risk_level = "LOW"
        explanation = (
            "The machine does not show sufficient risk indicators "
            "to require further action at this time."
        )
        recommendation = "Continue normal monitoring."

    # -------------------------------
    # API Response
    # -------------------------------
    return {
        "risk_score": round(float(risk_score), 4),
        "risk_level": risk_level,
        "abnormal_sensors": abnormal,
        "explanation": explanation,
        "recommendation": recommendation
    }
