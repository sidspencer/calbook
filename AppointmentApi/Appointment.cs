using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalBookApi
{
    public class Appointment
    {   
        [BsonId]
        [BsonElement(elementName: "_id")]
        public ObjectId id { get; set; }

        [BsonElement(elementName: "calDate")]
        public CalDate calDate { get; set; }
        
        [BsonElement(elementName: "timeslot")]
        public Timeslot timeslot { get; set; }
        
        [BsonElement(elementName: "notes")]        
        public string notes { get; set; }

        [BsonConstructor]
        public Appointment(ObjectId iD, CalDate caldate, Timeslot timeSlot, string notes) {
            this.id = iD;
            this.calDate = new CalDate(caldate.dd, caldate.mm, caldate.yyyy);
            this.timeslot = new Timeslot(timeSlot.hour);
            this.notes = notes;
        }

        public Appointment() {
            this.calDate = new CalDate();
            this.timeslot = new Timeslot(1);
            this.notes = "";
        }
    }
}
