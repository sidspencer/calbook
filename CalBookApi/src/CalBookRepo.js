const mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
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
                    console.log('fetched appointments all');
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
    
                client.db('CalBookDB').collection('Appointment').find({ 'calDate.yyyy' : yyyy, 'calDate.mm': mm, 'calDate.dd': dd }).toArray((err, items) => {
                    console.log('fetched appointments by date')
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
                    console.log('created appointment');
                    resolve(result);
                });
            });
        });
       
        return p;
    }

    static updateAppointment(a) {
        var appointment = a;
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').updateOne({'_id': new ObjectId(appointment._id)}, {
                    '$set': {
                        'notes': appointment.notes,
                        'calDate.yyyy': appointment.calDate.yyyy,
                        'calDate.mm': appointment.calDate.mm,
                        'calDate.dd': appointment.calDate.dd,
                        'timeslot.hour': appointment.timeslot.hour,
                    }
                }, (err, result) => {
                    console.log('updated appointment');
                    resolve(result);
                    return;
                });
            });
        });
       
        return p;
    }

    static deleteAppointment(aId) {
        var appointmentId = aId;
        const p = new Promise((resolve, reject) => {
            mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
    
                client.db('CalBookDB').collection('Appointment').deleteOne({'_id': new ObjectId(appointmentId)}, (err, result) => {
                    console.log('deleted appointment');
                    resolve(result);
                    return;
                });
            });
        });
       
        return p;
    }
}

module.exports = CalBookRepo;