const nodemailer = require('nodemailer');

class MailerService{
    static async  sendWelcome(){

        let transporter = nodemailer.createTransport({
        
            service: 'gmail',
 
            // port: 2525,
            auth: {
                user: 'youremail@address.com',
                pass: 'yourpassword'
            }
         

        })
        const message = {
            from: 'sender@email.com', // sender address
            to: 'to@email.com',    
            subject: 'welcome', // Subject line
            text: 'Thank you for registering 🌻' // Plain text body
        
        }
        try {
            let info = await transporter.sendMail(message);
            console.log(info)
        } catch (error) {
            console.log(error)
        }
      
    }
}


module.exports = MailerService