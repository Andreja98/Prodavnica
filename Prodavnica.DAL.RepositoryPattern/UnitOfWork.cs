using Prodavnica.Common.Interfaces;
using Prodavnica.DAL.Context;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.DAL.RepositoryPattern
{
    public class UnitOfWork:IUnitOfWork
    {
        private readonly ProdavnicaContext context;

        public IMaterijalRepository Materijali { get; }
        public IVrstaMaterijalaRepository VrsteMaterijala { get; }
        public IRacunRepository Racuni { get; set; }
        public IStavkaRacunaRepository StavkeRacuna { get; set; }
        public IKorisnikRepository Korisnici { get; set; }
        public IRolaRepository Role { get; set; }

        public UnitOfWork(ProdavnicaContext context)
        {
            this.context = context;
            Materijali = new MaterijalRepository(context);
            VrsteMaterijala = new VrstaMaterijalaRepository(context);
            Racuni = new RacunRepository(context);
            StavkeRacuna = new StavkaRacunaRepository(context);
            Korisnici = new KorisnikRepository(context);
            Role = new RolaRepository(context);
        }

        public void Dispose()
        {
            context.Dispose();
        }

        public int SaveChanges()
        {
            return context.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            return await context.SaveChangesAsync();
        }
    }
}
