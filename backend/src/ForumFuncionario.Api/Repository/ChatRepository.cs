using ForumFuncionario.Api.Context;
using ForumFuncionario.Api.Model.Entity;
using ForumFuncionario.Api.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace ForumFuncionario.Api.Repository
{
    public class ChatRepository(AppDbContext context, ILogger<ChatRepository> logger)
        : GenericRepository<Chat, Guid>(context, logger), IChatRepository
    {
        public async Task<Chat?> GetChatByUsersAsync(int loggedInUserId, int otherUserId)
        {
            // Check if a chat exists with exactly two users: the logged-in user and the other user
            return await context.Set<Chat>()
                .Where(chat => chat.UsersId.Count == 2 &&
                               chat.UsersId.Contains(loggedInUserId) &&
                               chat.UsersId.Contains(otherUserId))
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Chat>> GetChatsByUserIdAsync(int userId)
        {
            return await context.Set<Chat>()
                .Where(chat => chat.UsersId.Contains(userId))
                .ToListAsync();
        }
    }
}
