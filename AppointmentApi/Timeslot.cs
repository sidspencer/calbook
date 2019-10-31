using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalBookApi
{
    [BsonIgnoreExtraElements]
    public class Timeslot
    {   
        [BsonElement(elementName: "hour")]
        public int hour { get; set; }

        [BsonConstructor]
        public Timeslot(int hOur) {
            this.hour = hOur;
        }
    }
}
