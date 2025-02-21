using Core.Entities;

namespace Core.Interfaces
{
    public interface IPaymentService
    {
        Task<ShoppingCart?> CreateOrUpdatePayementIntent(string cartId);
    }
}
