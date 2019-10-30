using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.Common.Interfaces
{
    public interface IUnitOfWork:IDisposable
    {
        IMaterijalRepository Materijali { get; }
        IVrstaMaterijalaRepository VrsteMaterijala { get; }
        IRacunRepository Racuni { get; }
        IStavkaRacunaRepository StavkeRacuna { get; }
        IKorisnikRepository Korisnici { get; }
        IRolaRepository Role { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync();
    }
}
