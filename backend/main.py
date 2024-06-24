from fastapi import FastAPI
from pydantic import BaseModel

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
