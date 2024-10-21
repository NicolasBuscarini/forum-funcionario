using ForumFuncionario.Api.Model.Request;
using ForumFuncionario.Api.Model.Response;
using ForumFuncionario.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using ForumFuncionario.Api.Service;

namespace ForumFuncionario.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserService userService, ILogger<UserController> logger, UserManager<UserApp> userManager) : BaseController(logger)
    {
        [HttpPut("")]
        [Authorize]
        [ProducesResponseType(typeof(BaseResponse<string>), 200)]
        [ProducesResponseType(typeof(BaseResponse<string>), 400)]
        [ProducesResponseType(typeof(BaseResponse<string>), 404)]
        [ProducesResponseType(typeof(BaseResponse<string>), 500)]
        public async Task<IActionResult> UpdateUser([FromForm] UserUpdateRequest request)
        {
            try
            {
                // Obtém o ID do usuário a partir do token de autorização
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                {
                    _logger.LogError("ID do usuário não encontrado no token.");
                    return HandleUnauthorized("Token inválido ou usuário não autenticado.");
                }

                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    _logger.LogInformation($"Usuário com ID {userId} não encontrado.");
                    return HandleNotFound<string>("Usuário não encontrado.");
                }

                // Atualiza as informações do usuário
                user.RaNome = request.RaNome ?? user.RaNome;
                user.UserProtheusId = request.UserProtheusId ?? user.UserProtheusId;
                user.Email = request.Email ?? user.Email;

                // Verifica se a foto foi enviada e atualiza
                if (request.Foto != null)
                {
                    using var memoryStream = new MemoryStream();
                    await request.Foto.CopyToAsync(memoryStream);
                    user.Foto = memoryStream.ToArray();
                }

                var result = await userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    _logger.LogError($"Erro ao atualizar o usuário com ID {userId}.");
                    return HandleServerError("Erro ao atualizar o usuário. Verifique os dados e tente novamente.");
                }

                _logger.LogInformation($"Usuário com ID {userId} atualizado com sucesso.");
                return CreateResponse("Usuário atualizado com sucesso.", nameof(UpdateUser), userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o usuário com ID.");
                return HandleServerError("Erro inesperado ao atualizar o usuário. Por favor, tente novamente mais tarde.");
            }
        }

        /// <summary>
        /// Recupera o usuário atualmente autenticado.
        /// Se nenhum usuário estiver autenticado, retorna uma mensagem de erro.
        /// </summary>
        /// <returns>
        /// Uma resposta com os dados do usuário autenticado ou uma mensagem de erro se o usuário não for encontrado.
        /// </returns>
        /// <response code="200">Usuário atual recuperado com sucesso.</response>
        /// <response code="404">Usuário atual não encontrado ou não autenticado.</response>
        /// <response code="500">Erro inesperado no servidor ao tentar recuperar o usuário.</response>
        [HttpGet("get-current-user")]
        [ProducesResponseType(typeof(BaseResponse<UserApp>), 200)]   // Sucesso
        [ProducesResponseType(typeof(BaseResponse<string>), 404)]    // Não Encontrado
        [ProducesResponseType(typeof(BaseResponse<string>), 500)]    // Erro Interno do Servidor
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                logger.LogInformation("Tentando recuperar o usuário atual...");

                var response = await userService.GetCurrentUser();
                if (response != null)
                {
                    logger.LogInformation("Usuário atual recuperado com sucesso.");
                    return CreateResponse(response, nameof(GetCurrentUser), null);
                }
                else
                {
                    logger.LogWarning("Nenhum usuário autenticado encontrado.");
                    return HandleNotFound<UserApp>("Nenhum usuário autenticado encontrado.");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Ocorreu um erro ao recuperar o usuário atual.");
                return HandleServerError("Um erro inesperado ocorreu ao recuperar o usuário atual.");
            }
        }

        /// <summary>
        /// Endpoint para recuperar a foto do usuário autenticado.
        /// </summary>
        /// <returns>A foto do usuário em formato binário (imagem).</returns>
        /// <response code="200">Foto do usuário recuperada com sucesso.</response>
        /// <response code="204">Foto não encontrada para o usuário.</response>
        /// <response code="500">Erro inesperado ao recuperar a foto.</response>
        [HttpGet("photo")]
        [Authorize]
        [ProducesResponseType(200)]   // Sucesso, retorna a foto
        [ProducesResponseType(204)]   // Foto não encontrada
        [ProducesResponseType(500)]   // Erro no servidor
        public async Task<IActionResult> GetUserPhoto()
        {
            try
            {
                logger.LogInformation("Tentando recuperar a foto do usuário...");

                // Obtém o ID do usuário a partir do token de autorização
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                {
                    logger.LogError("ID do usuário não encontrado no token.");
                    return HandleUnauthorized("Token inválido ou usuário não autenticado.");
                }

                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    logger.LogWarning($"Usuário com ID {userId} não encontrado.");
                    return HandleNotFound<string>("Usuário não encontrado.");
                }

                // Verifica se o usuário tem uma foto armazenada
                if (user.Foto == null || user.Foto.Length == 0)
                {
                    logger.LogWarning($"Foto não encontrada para o usuário com ID {userId}.");
                    // Retorna 204 No Content se não houver foto
                    return NoContent();
                }

                // Retorna a foto como uma resposta binária (image/jpeg, image/png, etc.)
                return File(user.Foto, "image/jpeg");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Ocorreu um erro ao recuperar a foto do usuário.");
                return HandleServerError("Erro inesperado ao recuperar a foto do usuário.");
            }
        }

    }
}
