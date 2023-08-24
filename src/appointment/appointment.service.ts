/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Appointment } from './entities/appointment.modelo';
import { PatientService } from '../patient/patient.service';


export interface AppointmentInput {
    patientId: number;
    startTime: Date;
    endTime: Date;
  }



@Injectable()
export class AppointmentService {
  constructor(private readonly patientService :PatientService){}


  public async scheduleAppointment(appointmentData: AppointmentInput): Promise<Appointment> {

    

    if(appointmentData.endTime <= appointmentData.startTime){
        throw new Error(`appointment's endTime should be after startTime`)
    }

    if(this.endtimeIsInTheNextDay(appointmentData))
    {
      throw new Error(`appointment's endTime should be in the same day as start time's`);
    }
    
    const patientExist = await this.patientService.doesPatientExist(appointmentData.patientId);


    if(!patientExist){
      throw new Error('Patient does not exist');
    }

    return {
      ...appointmentData,
      confirmed: false,
    };
  }

  private endtimeIsInTheNextDay(appointmentData: AppointmentInput): boolean{

    const differentDays = appointmentData.endTime.getUTCDay() !== appointmentData.startTime.getUTCDay();
    const diffetentMonths = (appointmentData.endTime.getUTCMonth() !== appointmentData.startTime.getUTCMonth());
    const differentYears = (appointmentData.endTime.getUTCFullYear() !== appointmentData.startTime.getFullYear())

   return differentDays || diffetentMonths || differentYears;
  }
}
