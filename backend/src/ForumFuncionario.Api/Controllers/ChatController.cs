using ForumFuncionario.Api.Model.Entity;
using ForumFuncionario.Api.Model.Response;
using ForumFuncionario.Api.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ForumFuncionario.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController(IChatService chatService, ILogger<ChatController> logger) : BaseController(logger)
    {
        [HttpPost("GetOrCreateChat")]
        [Authorize]
        [ProducesResponseType(typeof(BaseResponse<Chat>), 200)]
        [ProducesResponseType(typeof(BaseResponse<bool>), 500)]
        public async Task<IActionResult> GetOrCreateChat([FromQuery] string username)
        {
            try
            {
                // Assumindo que o ID do usuário logado é recuperado do token JWT
                var loggedInUserId = User.FindFirst("sub")?.Value;

                if (loggedInUserId == null)
                {
                    return HandleUnauthorized("Não foi possível recuperar o usuário logado.");
                }

                var chat = await chatService.GetOrCreateChatAsync(username);

                return CreateResponse(chat, nameof(GetOrCreateChat), new { username });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao tentar obter ou criar chat.");
                return HandleServerError("Erro inesperado. Por favor, tente novamente mais tarde.");
            }
        }

        [HttpGet("GetUserChats")]
        [Authorize]
        [ProducesResponseType(typeof(BaseResponse<IEnumerable<Chat>>), 200)]
        [ProducesResponseType(typeof(BaseResponse<bool>), 500)]
        public async Task<IActionResult> GetUserChats()
        {
            try
            {
                var userChats = await chatService.GetUserChatsAsync();

                return CreateResponse(userChats, nameof(GetUserChats), null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao tentar obter os chats do usuário.");
                return HandleServerError("Erro inesperado. Por favor, tente novamente mais tarde.");
            }
        }
    }
}
