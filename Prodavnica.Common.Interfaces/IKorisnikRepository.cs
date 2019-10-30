using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IKorisnikRepository:IRepository<Korisnik>
    {
        Task<Korisnik> login(Korisnik korisnik);
        int poslednjiIdKorisnika();
    }
}
