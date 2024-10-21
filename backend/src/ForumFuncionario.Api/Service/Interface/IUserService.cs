using ForumFuncionario.Api.Model.Request;
using ForumFuncionario.Api.Model.Response;

namespace ForumFuncionario.Api.Service.Interface
{
    public interface IUserService
    {
        Task<UserApp> UpdateUserAsync(string userId, UserUpdateRequest request);
        Task<GetUserResponse> GetCurrentUser();
    }
}
