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
                // Obt�m o ID do usu�rio a partir do token de autoriza��o
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                {
                    _logger.LogError("ID do usu�rio n�o encontrado no token.");
                    return HandleUnauthorized("Token inv�lido ou usu�rio n�o autenticado.");
                }

                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    _logger.LogInformation($"Usu�rio com ID {userId} n�o encontrado.");
                    return HandleNotFound<string>("Usu�rio n�o encontrado.");
                }

                // Atualiza as informa��es do usu�rio
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
                    _logger.LogError($"Erro ao atualizar o usu�rio com ID {userId}.");
                    return HandleServerError("Erro ao atualizar o usu�rio. Verifique os dados e tente novamente.");
                }

                _logger.LogInformation($"Usu�rio com ID {userId} atualizado com sucesso.");
                return CreateResponse("Usu�rio atualizado com sucesso.", nameof(UpdateUser), userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao atualizar o usu�rio com ID.");
                return HandleServerError("Erro inesperado ao atualizar o usu�rio. Por favor, tente novamente mais tarde.");
            }
        }

        /// <summary>
        /// Recupera o usu�rio atualmente autenticado.
        /// Se nenhum usu�rio estiver autenticado, retorna uma mensagem de erro.
        /// </summary>
        /// <returns>
        /// Uma resposta com os dados do usu�rio autenticado ou uma mensagem de erro se o usu�rio n�o for encontrado.
        /// </returns>
        /// <response code="200">Usu�rio atual recuperado com sucesso.</response>
        /// <response code="404">Usu�rio atual n�o encontrado ou n�o autenticado.</response>
        /// <response code="500">Erro inesperado no servidor ao tentar recuperar o usu�rio.</response>
        [HttpGet("get-current-user")]
        [ProducesResponseType(typeof(BaseResponse<UserApp>), 200)]   // Sucesso
        [ProducesResponseType(typeof(BaseResponse<string>), 404)]    // N�o Encontrado
        [ProducesResponseType(typeof(BaseResponse<string>), 500)]    // Erro Interno do Servidor
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                logger.LogInformation("Tentando recuperar o usu�rio atual...");

                var response = await userService.GetCurrentUser();
                if (response != null)
                {
                    logger.LogInformation("Usu�rio atual recuperado com sucesso.");
                    return CreateResponse(response, nameof(GetCurrentUser), null);
                }
                else
                {
                    logger.LogWarning("Nenhum usu�rio autenticado encontrado.");
                    return HandleNotFound<UserApp>("Nenhum usu�rio autenticado encontrado.");
                }
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Ocorreu um erro ao recuperar o usu�rio atual.");
                return HandleServerError("Um erro inesperado ocorreu ao recuperar o usu�rio atual.");
            }
        }

        /// <summary>
        /// Endpoint para recuperar a foto do usu�rio autenticado.
        /// </summary>
        /// <returns>A foto do usu�rio em formato bin�rio (imagem).</returns>
        /// <response code="200">Foto do usu�rio recuperada com sucesso.</response>
        /// <response code="204">Foto n�o encontrada para o usu�rio.</response>
        /// <response code="500">Erro inesperado ao recuperar a foto.</response>
        [HttpGet("photo")]
        [Authorize]
        [ProducesResponseType(200)]   // Sucesso, retorna a foto
        [ProducesResponseType(204)]   // Foto n�o encontrada
        [ProducesResponseType(500)]   // Erro no servidor
        public async Task<IActionResult> GetUserPhoto()
        {
            try
            {
                logger.LogInformation("Tentando recuperar a foto do usu�rio...");

                // Obt�m o ID do usu�rio a partir do token de autoriza��o
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userId == null)
                {
                    logger.LogError("ID do usu�rio n�o encontrado no token.");
                    return HandleUnauthorized("Token inv�lido ou usu�rio n�o autenticado.");
                }

                var user = await userManager.FindByIdAsync(userId);

                if (user == null)
                {
                    logger.LogWarning($"Usu�rio com ID {userId} n�o encontrado.");
                    return HandleNotFound<string>("Usu�rio n�o encontrado.");
                }

                // Verifica se o usu�rio tem uma foto armazenada
                if (user.Foto == null || user.Foto.Length == 0)
                {
                    logger.LogWarning($"Foto n�o encontrada para o usu�rio com ID {userId}.");
                    // Retorna 204 No Content se n�o houver foto
                    return NoContent();
                }

                // Retorna a foto como uma resposta bin�ria (image/jpeg, image/png, etc.)
                return File(user.Foto, "image/jpeg");
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Ocorreu um erro ao recuperar a foto do usu�rio.");
                return HandleServerError("Erro inesperado ao recuperar a foto do usu�rio.");
            }
        }

    }
}
