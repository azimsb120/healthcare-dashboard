from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

class PatientRecord(BaseModel):
    PatientID: int
    Name: str
    Age: int
    Gender: str
    Diagnosis: str
    Treatment: str
    AdmissionDate: str
    DischargeDate: str

# Load the dataset
patient_data = pd.read_csv('data/healthcare_dataset.csv')

@app.get("/patients")
def get_patients():
    return patient_data.to_dict(orient="records")
