const express = require("express");
const expressWinston = require("express-winston");
const cors = require("cors");
const session = require("express-session");
require('../loaders/mongoose')()
const {start} = require('../loaders/redis');
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const AdminRoutes = require("../api/routes/admin");
const PatientRoutes = require("../api/routes/patient");
const config = require("../config/index");
const HttpLogger = require("../api/middleware/index");
const sessionStore = require("../loaders/sessionStore");
const rateLimiter = require('../api/middleware/limiter');
const serverLog = require("./logger").serverLogger;


class Server{

  constructor(port){
    this.app = express();
    this.create();
    this.port = port
  }
  create(){
    this.app.use(cors());

    // bodyparser
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: false,
        cookie:{
         httpOnly:true,
    
        },
        store: sessionStore
      })
    );
    
    // http logger
    this.app.use(expressWinston.logger(HttpLogger()));
    
    //  health checks
    // GET
    this.app.get("/health",(req, res) => {
      res.status(200).json({status:'UP',uptime:process.uptime(), time: Date.now().toString()});
    });
    
    // routes
    this.app.use(config.api.AdminPrefix, AdminRoutes);
    this.app.use(config.api.PatientPrefix,rateLimiter, PatientRoutes);
    this.app.use(errors())
    
    //Each 404 send to Omnipotent error handler
    
    this.app.use( (req, res, next) => {
      res.status(404).json("Sorry can't find that!")
    })
    
    
    // Omnipotent error handler
    this.app.use((error, req, res, next) => {
      res.status(500).json(error);
    });
    
  }
  startServer(){
      this.app.listen(this.port,(err) =>{
        if (err) {
          serverLog.error(err);
          process.exit(1);
         
        }
        start();
      serverLog.info(`
           **********************************************
            Server listening on port: ${this.port}
           **********************************************
        `);
      })
     
       
  }
}



module.exports = Server;
