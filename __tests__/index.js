const mongoose = require('mongoose');
const dotenv = require("dotenv");
const config = require('../config/index');
const adminService = require('../services/admin');
const patientService = require('../services/patient');
const AdminRepository = require('../repository/admin');
const PatientRepository = require('../repository/patient');
dotenv.config();
const AdminData = {
    name:"admin admin",
    email:"admin@Yahoo.com",
    password:"admin",
	age:50,
    address:"admin street",
    role:'Admin'
}

const patientData = {
    name:"quan chi",
    email:"D@Yahoo.com",
    password:"Dayede",
	age:22,
	gender:"F",
	address:"netherealm"
}
let UserId;

    beforeAll( async () =>{
        await mongoose.connect(config.TestDatabaseURL,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        },(err) =>{
            if (err) {
                console.error(err);
                process.exit(1);
            }
            
        })
        AdminRepository.deleteAll();
        PatientRepository.deleteAll()

    })

    afterAll(done => {
        AdminRepository.deleteAll();
        PatientRepository.deleteAll()
        mongoose.connection.close()

        done()
    })


    
        it('it would create a new admin successfully', async () =>{
            const admin = await adminService.SignUp(AdminData);
            expect(admin.name).toEqual(AdminData.name)
            expect(admin.email).toEqual(AdminData.email)
            expect(admin.address).toEqual(AdminData.address)
            expect(admin.age).toEqual(AdminData.age);
            expect(admin.role).toEqual(AdminData.role)
        })

        it('it would return an admin info', async() =>{
            
            const admin = await adminService.getAdminInformation(AdminData.email);
            expect(admin._id).toBeDefined()
            expect(admin.name).toEqual(AdminData.name)
            expect(admin.email).toEqual(AdminData.email)
            expect(admin.address).toEqual(AdminData.address)
            expect(admin.age).toEqual(AdminData.age);
            expect(admin.role).toEqual(AdminData.role)
            
        })

        it('should create a patience', async() =>{
            const patient = await patientService.createPatients(patientData);
            UserId  = patient._id
            expect(patient._id).toBeDefined()
            expect(patient.name).toEqual(patientData.name)
            expect(patient.email).toEqual(patientData.email)
            expect(patient.address).toEqual(patientData.address)
            expect(patient.age).toEqual(patientData.age);
            expect(patient.gender).toEqual(patientData.gender)
        })

        it('should fetch a patient by id', async () =>{
                const {patient} = await adminService.getPatient(UserId);
                expect(patient._id).toBeDefined()
                expect(patient.name).toEqual(patientData.name)
                expect(patient.email).toEqual(patientData.email)
                expect(patient.address).toEqual(patientData.address)
                expect(patient.age).toEqual(patientData.age);
                expect(patient.gender).toEqual(patientData.gender)
        })

     it('should fetch a patient by searching in desc or asc order', async() =>{
         let name  = patientData.name;
         let SortOrder = 'desc';
         const {patient} = await adminService.searchPatient(name,SortOrder);
      
        expect(patient[0]._id).toBeDefined()
         expect(patient[0].name).toEqual(patientData.name)
         expect(patient[0].email).toEqual(patientData.email)
         expect(patient[0].address).toEqual(patientData.address)
         expect(patient[0].age).toEqual(patientData.age);
         expect(patient[0].gender).toEqual(patientData.gender)
     })

     
 
