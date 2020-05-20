# Backend System Boilerplate 📖

This is another starter for building a Backend System written with Node.js, Express, and MongoDB, Mongooose for learning purposes.

# Getting Started 🏁

This project would be based on my own version of IBM's [Example Health](https://developer.ibm.com/patterns/app-modernization-s2i-openshift/?cm_mmc=OSocial_Twitter-_-Developer_IBM+Developer-_-WW_WW-_-ibmdev-&cm_mmca1=000037FD&cm_mmca2=10010797&linkId=73533671) but in form of an API not a full application. This Project heavily uses the node design patterns and architecture found in [Bulletproof node](https://github.com/santiq/bulletproof-nodejs). The system does nothing fancy, its just to create a learning curve of how best to use the technologies listed above and getting the best out of them and hopefully adding more to it.

# Project Description 📚

The project is a backend system for a health management system that serves any front-end platform such as Android, iOS or application built with front end frameworks such as React, Vue, and the ones we haven't heard of with patient records, appointments informations and reminders, and also keeping track of medications in json format.The management of the system would be controlled by an authenticated admin account where CRUD operations would be performed on patient records.

# Roadmap

- [x] Api Layer 🍰
- [x] Authentication and Authorization for both Admin and Patients or Users Accounts
- [ ] Units test with Jest
- [x] Pagination, Searching, Sorting
- [ ] Continuous Integration with Travis CI
- [ ] Linting With Eslint
- [x] sending of emails 
- [x] Logging Layer
- [ ] end to end testing with testcafe
- [ ] hosting on heroku
- [x] Session-based Authentication(Mongodb as session store. Anything data can be used)
