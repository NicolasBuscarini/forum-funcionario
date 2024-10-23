namespace ForumFuncionario.Api.Model.Entity
{
    public class Chat
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public List<string> UsersNames { get; set; }
        public bool IsGroup { get; set; }
        public byte[]? Foto { get; set; }

    }
}
