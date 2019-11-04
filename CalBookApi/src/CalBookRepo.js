const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

class CalBookRepo {
    static getAllAppointments() {
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').find().toArray((err, items) => {
                    resolve(items);
                });
            });
        });
       
        return p;
    }

    static getAppointmentsByDate(yyyy, mm, dd) {
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                let y = Number.parseInt(yyyy);
                let m = Number.parseInt(mm);
                let d = Number.parseInt(dd);
    
                client.db('CalBookDB').collection('Appointment').find({ 'calDate.yyyy' : y, 'calDate.mm': m, 'calDate.dd': d }).toArray((err, items) => {
                    resolve(items);
                });
            });
        });
       
        return p;
    }

    static createNewAppointment(a) {
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').insertOne(a, (err, result) => {
                    console.log('created new appointment');
                    resolve(result);
                });
            });
        });
       
        return p;
    }

    static updateAppointment(a) {
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').updateOne({'_id': a._id}, a, (err, result) => {
                    console.log('updated appointment');
                    resolve(result);
                    return;
                });
            });
        });
       
        return p;
    }

    static deleteAppointment(a) {
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').deleteOne({'_id': a._id}, (err, result) => {
                    console.log('updated appointment');
                    resolve(result);
                    return;
                });
            });
        });
       
        return p;
    }
}

module.exports = CalBookRepo;