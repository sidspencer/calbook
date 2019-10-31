using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalBookApi
{
    [BsonIgnoreExtraElements]
    public class Appointment
    {   
        [BsonId]
        public ObjectId _id { get; set; }

        [BsonIgnore]
        public ObjectId id { get; set; }

        [BsonElement(elementName: "calDate")]
        public CalDate calDate { get; set; }
        
        [BsonElement(elementName: "timeslot")]
        public Timeslot timeslot { get; set; }
        
        [BsonElement(elementName: "notes")]        
        public string notes { get; set; }

        [BsonConstructor]
        public Appointment(ObjectId _id, CalDate caldate, Timeslot timeSlot, string notes) {
            this._id = _id;
            this.id = _id;
            this.calDate = new CalDate(caldate.dd, caldate.mm, caldate.yyyy);
            this.timeslot = new Timeslot(timeSlot.hour);
            this.notes = notes;
        }
    }
}
