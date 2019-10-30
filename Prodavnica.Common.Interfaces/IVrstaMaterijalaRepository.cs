using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IVrstaMaterijalaRepository:IRepository<VrstaMaterijala>
    {
        Task<IEnumerable<VrstaMaterijala>> vrsteMaterijalaPoMaterijalId(int materijalId);
        double cenaPoVrstaMaterijalaId(int vrstaMaterijalaId);
    }
}

