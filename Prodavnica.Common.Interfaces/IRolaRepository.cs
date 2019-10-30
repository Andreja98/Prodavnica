using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IRolaRepository: IRepository<Rola>
    {
        Task<IEnumerable<Korisnik>> prikazKorisnikaPoRoli(int rolaId);
    }
}
