using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CalBookApi {
    [BsonIgnoreExtraElements]
    public class CalDate {
        [BsonElement(elementName: "dd")]
        public int dd { get; set; } 
        
        [BsonElement(elementName: "mm")]
        public int mm { get; set; } 

        [BsonElement(elementName: "yyyy")]
        public int yyyy { get; set; } 

        [BsonConstructor]
        public CalDate(int dD, int mM, int yYYY) {
            this.yyyy = yYYY;
            this.mm = mM;
            this.dd = dD;
        }

        public CalDate(string dateCode) {
            this.yyyy = int.Parse(dateCode.Substring(0, 4));
            this.mm = int.Parse(dateCode.Substring(4, 2));
            this.dd = int.Parse(dateCode.Substring(6, 2));
        }

        public string ToDateCode() {
            string dateCode = string.Format("{0}{1}{2}",
                this.yyyy.ToString("D4"),
                this.mm.ToString("D2"),
                this.dd.ToString("D2")
            );

            return dateCode;
        }
    }
}
