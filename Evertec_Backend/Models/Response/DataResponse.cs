namespace Evertec_Backend.Models.Response
{
    public class DataResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public object Data { get; set; }
        public DataResponse()
        {
            this.Success = false;
            this.Message = "⚠ Something went wrong";
            this.Data = new { };
        }

    }
}
