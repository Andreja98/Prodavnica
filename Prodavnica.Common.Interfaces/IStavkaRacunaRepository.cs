using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IStavkaRacunaRepository:IRepository<StavkaRacuna>
    {
        Task<IEnumerable<StavkaRacuna>> StavkeRacunaPoSifriRacuna(int SifraRacuna);
        void UvecanjeCeneRacuna(StavkaRacuna stavkaRacuna);
        void AzurirajVrstuMaterijala(StavkaRacuna stavkaRacuna);
        void SmanjenjeCeneRacunaNakonBrisanjaStavke(StavkaRacuna stavkaRacuna);
        VrstaMaterijala VrsteMaterijalaPoVrstaMaterijalaId(int vrstaMaterijalaId);
        Task<StavkaRacuna> StavkeRacunaPoVrstiMaterijalaId(int SifraRacuna, int vrstaMaterijalaId);
        Task<IEnumerable<int>> SveVrsteMaterijala(int sifraRacuna);
        void AzuriranjeVrsteMaterijalaNakonBrisanjaRacuna(StavkaRacuna stavkaRacuna);
        int poslednjiId();
    }
}
