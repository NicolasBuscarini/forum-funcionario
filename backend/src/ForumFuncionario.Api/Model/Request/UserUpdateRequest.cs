using Microsoft.AspNetCore.Http;

namespace ForumFuncionario.Api.Model.Request
{
    public class UserUpdateRequest
    {
        public string? RaNome { get; set; }
        public string? UserProtheusId { get; set; }
        public string? Email { get; set; }
        public IFormFile? Foto { get; set; } // Para upload da foto
    }
}
