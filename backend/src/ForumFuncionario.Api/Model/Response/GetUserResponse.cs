public class GetUserResponse
{
    public string RaNome { get; set; }
    public string? Foto { get; set; } // Base64 string
    public int Id { get; set; }
    public string UserName { get; set; }
    public string NormalizedUserName { get; set; }
    public string? NormalizedEmail { get; set; }
    public bool EmailConfirmed { get; set; }
    public string? PhoneNumber { get; set; }
}