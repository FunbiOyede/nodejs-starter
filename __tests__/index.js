const mongoose = require('mongoose');
const dotenv = require("dotenv");
const config = require('../config/index');
const adminService = require('../services/admin');
dotenv.config();
const AdminData = {
    name:"admin admin",
	email:"admin@Yahoo.com",
	password:"admin",
	age:50,
    address:"admin street",
    role:'Admin'
}


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

 })

 afterAll(done => {
    mongoose.connection.close()
    done()
  })

 describe('Admin Services',() =>{
       
            xit('it would create a new admin successfully', async () =>{
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
        
 })

   
