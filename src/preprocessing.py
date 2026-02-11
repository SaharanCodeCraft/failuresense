import pandas as pd

def build_input_dataframe(
    air_temp,
    process_temp,
    rotational_speed,
    torque,
    tool_wear,
    machine_type
):
    """
    Build model-ready input DataFrame from raw sensor values.
    """

    return pd.DataFrame([{
        "Air temperature [K]": air_temp,
        "Process temperature [K]": process_temp,
        "Rotational speed [rpm]": rotational_speed,
        "Torque [Nm]": torque,
        "Tool wear [min]": tool_wear,
        "Type_L": 1 if machine_type == "L" else 0,
        "Type_M": 1 if machine_type == "M" else 0
    }])
