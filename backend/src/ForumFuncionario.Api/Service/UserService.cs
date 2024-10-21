using ForumFuncionario.Api.Model.Request;
using ForumFuncionario.Api.Repository.Interface;
using ForumFuncionario.Api.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace ForumFuncionario.Api.Service
{
    public class UserService(IUserRepository userRepository, UserManager<UserApp> userManager, ILogger<UserService> logger, IHttpContextAccessor httpContextAccessor) : IUserService
    {

        /// <summary>
        /// Atualiza os dados do usuário, incluindo a foto, com base no ID do token.
        /// </summary>
        /// <param name="userId">ID do usuário</param>
        /// <param name="request">Dados de atualização do usuário</param>
        /// <returns>Usuário atualizado</returns>
        public async Task<UserApp> UpdateUserAsync(string userId, UserUpdateRequest request)
        {
            try
            {
                logger.LogInformation($"Atualizando usuário com ID {userId}.");

                // Busca o usuário pelo ID
                var user = await userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    logger.LogWarning($"Usuário com ID {userId} não encontrado.");
                    throw new KeyNotFoundException("Usuário não encontrado.");
                }

                // Atualiza as informações do usuário se foram fornecidas
                user.RaNome = request.RaNome ?? user.RaNome;
                user.UserProtheusId = request.UserProtheusId ?? user.UserProtheusId;
                user.Email = request.Email ?? user.Email;

                // Se uma foto foi enviada, atualiza o campo 'Foto'
                if (request.Foto != null)
                {
                    using var memoryStream = new MemoryStream();
                    await request.Foto.CopyToAsync(memoryStream);
                    user.Foto = memoryStream.ToArray();
                }

                // Atualiza o usuário no banco de dados usando UserManager
                var result = await userManager.UpdateAsync(user);
                if (!result.Succeeded)
                {
                    logger.LogError($"Erro ao atualizar usuário com ID {userId}: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    throw new Exception("Erro ao atualizar o usuário.");
                }

                logger.LogInformation($"Usuário com ID {userId} atualizado com sucesso.");
                return user;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, $"Erro ao atualizar o usuário com ID {userId}.");
                throw new Exception("Erro inesperado ao atualizar o usuário. Por favor, tente novamente mais tarde.");
            }
        }

        /// <summary>
        /// Retrieves the currently authenticated user.
        /// </summary>
        /// <returns>The currently authenticated user.</returns>
        public async Task<GetUserResponse> GetCurrentUser()
        {
            try
            {
                UserApp user = (await userManager.GetUserAsync(httpContextAccessor.HttpContext!.User))!;
                return new GetUserResponse()
                {
                    RaNome = user.RaNome,
                    Foto = user.Foto != null ? Convert.ToBase64String(user.Foto) : null,
                    Id = user.Id,
                    UserName = user.UserName!,
                    NormalizedUserName = user.NormalizedUserName!,
                    NormalizedEmail = user.NormalizedEmail,
                    EmailConfirmed = user.EmailConfirmed,
                    PhoneNumber = user.PhoneNumber
                };
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error occurred while retrieving the current user.");
                throw;
            }
        }
    }
}
