def detect_abnormal_sensors(row):
    return {
        "high_tool_wear": bool(row["Tool wear [min]"] > 200),
        "high_torque": bool(row["Torque [Nm]"] > 50),
        "high_temp_diff": bool(
            (row["Process temperature [K]"] - row["Air temperature [K]"]) > 10
        )
    }



def compute_stress_score(abnormal_sensors):
    return sum(abnormal_sensors.values())


def determine_risk_level(risk_score, stress_score):
    """
    Determine operational risk level.
    MEDIUM represents engineering attention, not imminent failure.
    """

    # HIGH: strong statistical risk + high stress
    if risk_score >= 0.6 and stress_score >= 2:
        return "HIGH"

    # MEDIUM: either moderate probability OR moderate stress
    if stress_score >= 1 or risk_score >= 0.15:
        return "MEDIUM"

    # LOW: stable operation
    return "LOW"



def generate_explanation(row, abnormal_sensors, risk_level):
    reasons = []

    if abnormal_sensors["high_tool_wear"]:
        reasons.append("tool wear is unusually high")
    if abnormal_sensors["high_torque"]:
        reasons.append("torque levels are abnormally high")
    if abnormal_sensors["high_temp_diff"]:
        reasons.append("process temperature is much higher than air temperature")

    if reasons:
        explanation = "The machine is flagged because " + ", and ".join(reasons) + "."
    else:
        explanation = (
            "The machine shows no obvious sensor abnormalities, "
            "but the model has detected subtle risk patterns."
        )

    explanation += f" Overall risk level is assessed as {risk_level}."
    return explanation


def recommend_action(risk_level, abnormal_sensors):
    if risk_level == "HIGH":
        if abnormal_sensors.get("high_tool_wear"):
            return "Immediate maintenance recommended: inspect and replace tool."
        elif abnormal_sensors.get("high_torque"):
            return "Immediate maintenance recommended: inspect drivetrain and load conditions."
        else:
            return "Immediate maintenance recommended: perform full system inspection."

    elif risk_level == "MEDIUM":
        if abnormal_sensors.get("high_tool_wear"):
            return "Schedule maintenance soon: monitor tool wear closely."
        elif abnormal_sensors.get("high_torque"):
            return "Monitor torque levels and schedule inspection if trend continues."
        else:
            return "Increase monitoring frequency and review operating conditions."

    return "No immediate action required. Continue normal monitoring."
