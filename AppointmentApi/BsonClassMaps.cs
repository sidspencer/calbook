using MongoDB.Bson.Serialization;

namespace CalBookApi {
    public class MapRegistrar {
        public static void MapBsonClasses() {
            BsonClassMap.RegisterClassMap<CalDate>(cm => {
                cm.MapField(d => d.yyyy);
                cm.MapField(d => d.mm);
                cm.MapField(d => d.dd);
            });

             BsonClassMap.RegisterClassMap<Timeslot>(cm => {
                cm.MapField(t => t.hour);
             });

              BsonClassMap.RegisterClassMap<Appointment>(cm => {
                cm.MapIdField(m => m.Id);
                cm.GetMemberMapForElement("calDate");
                cm.GetMemberMapForElement("timeslot");
                cm.MapField(a => a.notes);
            });
        }
    }
}