from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from mangum import Mangum

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
def get_patients(page: int = 1, size: int = 100):
    start = (page - 1) * size
    end = start + size
    return {
        "data": patient_data.iloc[start:end].to_dict(orient="records"),
        "total": len(patient_data),
        "page": page,
        "size": size
    }

@app.post("/patients")
def add_patient(record: PatientRecord):
    global patient_data
    # pydantic model to python dict
    record_dict = record.model_dump()
    # append row by making a new df and concatenating both
    new_row = pd.DataFrame([record_dict])
    patient_data = pd.concat([patient_data, new_row], ignore_index=True)
    # return the new record
    return record_dict

handler = Mangum(app)
