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
    public class KorisnikRepository : Repository<Korisnik>, IKorisnikRepository
    {
        private readonly ProdavnicaContext _context;

        public KorisnikRepository(ProdavnicaContext context) : base(context)
        {
            _context = context;
        }

        public ProdavnicaContext context
        {
            get { return context as ProdavnicaContext; }
        }
        public async Task<Korisnik> login(Korisnik korisnik)
        {
            return await _context.Korisnici.Where(x => string.Equals(x.KorisnickoIme, korisnik.KorisnickoIme, StringComparison.CurrentCulture) && string.Equals(x.Lozinka, korisnik.Lozinka, StringComparison.CurrentCulture)).FirstOrDefaultAsync();
        }

        public int poslednjiIdKorisnika()
        {
            var poslednji = _context.Korisnici.Max(k => k.KorisnikId);
            return poslednji;
        }
    }
}
