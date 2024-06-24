from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

class PatientRecord(BaseModel):
    Name: str
    Age: int
    Gender: str
    Blood_Type: str
    Medical_Condition: str
    Date_of_Admission: str
    Doctor: str
    Hospital: str
    Insurance_Provider: str
    Billing_Amount: float
    Room_Number: int
    Admission_Type: str
    Discharge_Date: str
    Medication: str
    Test_Results: str

# Load the dataset and rename columns
patient_data = pd.read_csv('data/healthcare_dataset.csv')
patient_data.columns = [col.replace(" ", "_") for col in patient_data.columns]

@app.get("/patients")
def get_patients():
    return patient_data.to_dict(orient="records")
