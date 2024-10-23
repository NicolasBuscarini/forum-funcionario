using ForumFuncionario.Api.Model.Entity;

namespace ForumFuncionario.Api.Service.Interface
{
    public interface IChatService
    {
        Task<Chat> GetOrCreateChatAsync(string username);
        Task<IEnumerable<Chat>> GetUserChatsAsync();
    }
}