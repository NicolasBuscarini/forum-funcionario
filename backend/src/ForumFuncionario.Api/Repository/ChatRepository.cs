using ForumFuncionario.Api.Context;
using ForumFuncionario.Api.Model.Entity;
using ForumFuncionario.Api.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace ForumFuncionario.Api.Repository
{
    public class ChatRepository(AppDbContext context, ILogger<ChatRepository> logger)
        : GenericRepository<Chat, Guid>(context, logger), IChatRepository
    {
        public async Task<Chat?> GetChatByUsersAsync(string username, string otherUserName)
        {
            // Check if a chat exists with exactly two users: the logged-in user and the other user
            return await context.Set<Chat>()
                .Where(chat => chat.UsersNames.Count == 2 &&
                               chat.UsersNames.Contains(username) &&
                               chat.UsersNames.Contains(otherUserName))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Chat>> GetChatsByUserIdAsync(string username)
        {
            return await context.Set<Chat>()
                .Where(chat => chat.UsersNames.Contains(username))
                .ToListAsync();
        }
    }
}
