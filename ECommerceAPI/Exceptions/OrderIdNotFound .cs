using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ECommerceAPI.Exceptions
{
    public class OrderIdNotFound : Exception
    {
        public OrderIdNotFound()
        {
        }

        public OrderIdNotFound(string message) : base(message)
        {
        }
    }
}
