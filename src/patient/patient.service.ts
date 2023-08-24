/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Patient } from './patient.mode';
import { AppointmentInput } from 'src/appointment/appointment.service';
import { Appointment } from 'src/appointment/entities/appointment.modelo';


export interface PatientInput {
    name: string;
  }

@Injectable()
export class PatientService {
    private readonly patients: Patient[] = [];
    private nextId = 1;
    async register(patientInput: PatientInput):Promise<Patient>{

        const newPatient ={
            id:this.nextId++,
            name: patientInput.name
        };
        this.patients.push(newPatient);
        
        return newPatient;
    }

    async doesPatientExist(patientId: number):Promise<boolean>{
        return this.patients.some((patient)=>patient.id == patientId)
    }


    public async scheduleAppointment(appointmentData: AppointmentInput): Promise<Appointment>{
        const patientExist = await this.doesPatientExist(appointmentData.patientId);

        if(!patientExist){
            throw Error(`Patient doesn't exists`)
        }

        return {
            ...appointmentData,
            confirmed:false,
        }
    }

}
