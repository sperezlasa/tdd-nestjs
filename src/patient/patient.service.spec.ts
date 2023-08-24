/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';

describe('PatientService', () => {
  let service: PatientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatientService],
    }).compile();

    service = module.get<PatientService>(PatientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register',  () =>{
    it('should return a new patient with given name', async()=>{
      const NAME = 'Samuel Perez';
      const newPatient = await service.register({ name: NAME });

      expect(newPatient).toEqual({
        id: expect.any(Number),
        name: NAME,
      });
    });

    it(`should return false if no patient was registered`, async()=>{

      const patientId = 2;
      const exists = await service.doesPatientExist(patientId);

      expect(exists).toBe(false);
    })

    it('should return true when patient was registered', async () => {
      const { id: patientId } = await service.register({ name: 'John Doe' });
      const exists = await service.doesPatientExist(patientId);
      expect(exists).toBe(true);
    });

    it('should return different ids when called twice with the same name', async () => {
      const firstPatient = await service.register({ name: 'John Doe' });
      const secondPatient = await service.register({ name: 'John Doe' });
      expect(firstPatient).not.toEqual(secondPatient);
    });

   
  });
});
