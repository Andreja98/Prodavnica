using Microsoft.EntityFrameworkCore;
using Prodavnica.Common.Interfaces;
using Prodavnica.Common.Models;
using Prodavnica.DAL.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.DAL.RepositoryPattern
{
    public class RolaRepository:Repository<Rola>, IRolaRepository
    {
        private readonly ProdavnicaContext _context;

        public RolaRepository(ProdavnicaContext context) : base(context)
        {
            _context = context;
        }

        public ProdavnicaContext context
        {
            get { return context as ProdavnicaContext; }
        }

        public async Task<IEnumerable<Korisnik>> prikazKorisnikaPoRoli(int rolaId)
        {
            return await _context.Korisnici.Where(k => k.RolaId == rolaId).ToListAsync();
        }
    }
}
