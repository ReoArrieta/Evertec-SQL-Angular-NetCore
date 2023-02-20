namespace Evertec_Backend.Models.Request
{
    public class DataInfoRequest
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public DateTime BirthDay { get; set; }

        public string UserPhoto { get; set; } = null!;

        public int MaritalStatus { get; set; }

        public bool HasSiblings { get; set; }
    }
}
