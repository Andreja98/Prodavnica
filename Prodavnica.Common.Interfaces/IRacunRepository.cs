using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IRacunRepository : IRepository<Racun>
    {
        Task<Racun> RacunPoSifriRacuna(int sifraRacuna);
        IQueryable getRacunaSaStavkama(int sifraRacuna);
        Task<IEnumerable<Object>> zaradaPoMesecimaZaGodinu(int godina);
        List<int> SveGodineIzdatihRacuna();
        Task<IEnumerable<Object>> prodajaMaterijalaPoMesecima(int godina);
    }
}
