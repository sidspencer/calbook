using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalBookApi
{
    [BsonIgnoreExtraElements]
    public class Appointment
    {   
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement(elementName: "Id")]
        public string Id { get; set; }

        [BsonElement(elementName: "calDate")]
        public CalDate calDate { get; set; }
        
        [BsonElement(elementName: "timeslot")]
        public Timeslot timeslot { get; set; }
        
        [BsonElement(elementName: "notes")]        
        public string notes { get; set; }

        [BsonConstructor]
        public Appointment(string iD, CalDate caldate, Timeslot timeSlot, string notes) {
            this.Id = iD;
            this.calDate = new CalDate(caldate.dd, caldate.mm, caldate.yyyy);
            this.timeslot = new Timeslot(timeSlot.hour);
            this.notes = notes;
        }

        public Appointment() {
            this.Id = ObjectId.GenerateNewId().ToString();
            this.calDate = new CalDate(1, 1, 1979);
            this.timeslot = new Timeslot(1);
            this.notes = "";
        }
    }
}
