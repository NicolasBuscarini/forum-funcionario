using ForumFuncionario.Api.Model.Entity;
using ForumFuncionario.Api.Repository.Interface;
using ForumFuncionario.Api.Service.Interface;

namespace ForumFuncionario.Api.Service
{
    public class ChatService(IChatRepository chatRepository, IUserService userService, IUserRepository userRepository) : IChatService
    {
        public async Task<Chat> GetOrCreateChatAsync(string otherUserName)
        {
            var currentUser = await userService.GetCurrentUser();

            // Tenta encontrar um chat existente entre os dois usuários
            var existingChat = await chatRepository.GetChatByUsersAsync(currentUser.UserName, otherUserName);

            if (existingChat != null)
            {
                // Se o chat existir e o título estiver vazio, atualiza o título com o nome do outro usuário
                if (string.IsNullOrEmpty(existingChat.Title))
                {
                    // Busca o nome do outro usuário no sistema
                    var otherUser = await userRepository.GetUserByUsernameAsync(otherUserName); 
                    if (otherUser != null)
                    {
                        existingChat.Title = otherUser.UserName;  // Atualiza o título com o nome do outro usuário
                        existingChat.Foto = otherUser.Foto;
                        await chatRepository.UpdateAsync(existingChat, existingChat.Id); // Salva a atualização
                    }
                }

                return existingChat;
            }

            // Se não houver chat, cria um novo
            var newChat = new Chat
            {
                Id = Guid.NewGuid(),
                Title = "", // Inicialmente sem título
                UsersNames = new List<string> { currentUser.UserName, otherUserName },
                IsGroup = false
            };

            await chatRepository.CreateAsync(newChat);
            return newChat;
        }

        public async Task<IEnumerable<Chat>> GetUserChatsAsync()
        {
            var currentUser = await userService.GetCurrentUser();
            // Busca todos os chats em que o usuário logado está incluído
            var userChats = await chatRepository.GetChatsByUserIdAsync(currentUser.UserName);

            foreach (var chat in userChats)
            {
                // Se o chat não for um grupo e o título estiver vazio, atualiza o título com o nome do outro usuário
                if (!chat.IsGroup && string.IsNullOrEmpty(chat.Title))
                {
                    // Encontra o outro usuário no chat
                    var otherUserName = chat.UsersNames.FirstOrDefault(userId => userId != currentUser.UserName);
                    if (string.IsNullOrEmpty(otherUserName))
                    {
                        // Busca o nome do outro usuário
                        var otherUser = await userRepository.GetUserByUsernameAsync(otherUserName);
                        if (otherUser != null)
                        {
                            chat.Title = otherUser.UserName;  // Atualiza o título com o nome do outro usuário
                            chat.Foto = otherUser.Foto;
                        }
                    }
                }
            }

            return userChats;
        }

    }
}
