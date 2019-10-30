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
    public class VrstaMaterijalaRepository: Repository<VrstaMaterijala>, IVrstaMaterijalaRepository
    {
        private readonly ProdavnicaContext _context;

        public VrstaMaterijalaRepository(ProdavnicaContext context) : base(context)
        {
            _context = context;
        }

        public ProdavnicaContext context
        {
            get { return context as ProdavnicaContext; }
        }

        public double cenaPoVrstaMaterijalaId(int vrstaMaterijalaId)
        {
            return _context.VrsteMaterijala.Where(vm => vm.VrstaMaterijalaId == vrstaMaterijalaId).Select(vm => vm.Cena).FirstOrDefault();
        }

        public async Task<IEnumerable<VrstaMaterijala>> vrsteMaterijalaPoMaterijalId(int materijalId)
        {
            return await _context.VrsteMaterijala.Where(vm => vm.MaterijalId == materijalId).ToListAsync();
        }
    }
}
