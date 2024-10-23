using ForumFuncionario.Api.Model.Entity;

namespace ForumFuncionario.Api.Repository.Interface
{
    public interface IChatRepository : IGenericRepository<Chat, Guid>
    {
        Task<Chat?> GetChatByUsersAsync(string username, string otherUserName);
        Task<IEnumerable<Chat>> GetChatsByUserIdAsync(int userId);
    }
}
