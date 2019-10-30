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
    public class StavkaRacunaRepository:Repository<StavkaRacuna>,IStavkaRacunaRepository
    {
        private readonly ProdavnicaContext _context;

        public StavkaRacunaRepository(ProdavnicaContext context) : base(context)
        {
            _context = context;
        }

        public ProdavnicaContext context
        {
            get { return context as ProdavnicaContext; }
        }

        public async Task<IEnumerable<StavkaRacuna>> StavkeRacunaPoSifriRacuna(int SifraRacuna)
        {
            return await _context.StavkeRacuna.Where(sr => sr.SifraRacuna == SifraRacuna).ToListAsync();
        }

        public void UvecanjeCeneRacuna(StavkaRacuna stavkaRacuna)
        {
            var racun = _context.Racuni.Where(r => r.sifraRacuna == stavkaRacuna.SifraRacuna).FirstOrDefault();

            racun.ukupanIznos += Math.Round((stavkaRacuna.Cena * stavkaRacuna.Kolicina), 2);
            racun.datumIVremeIzdavanja = DateTime.Now;
        }

        public void AzurirajVrstuMaterijala(StavkaRacuna stavkaRacuna)
        {
            var vrsta = _context.VrsteMaterijala.Where(vm => vm.VrstaMaterijalaId == stavkaRacuna.VrstaMaterijalaId).FirstOrDefault();
            vrsta.Kolicina -= stavkaRacuna.Kolicina;
        }

        public void SmanjenjeCeneRacunaNakonBrisanjaStavke(StavkaRacuna stavkaRacuna)
        {
            var racun = _context.Racuni.Where(r => r.sifraRacuna == stavkaRacuna.SifraRacuna).FirstOrDefault();

            racun.ukupanIznos -= Math.Round((stavkaRacuna.Cena * stavkaRacuna.Kolicina), 2);
            racun.datumIVremeIzdavanja = DateTime.Now;
        }

        public VrstaMaterijala VrsteMaterijalaPoVrstaMaterijalaId(int vrstaMaterijalaId)
        {
            return  _context.VrsteMaterijala.Where(vm => vm.VrstaMaterijalaId == vrstaMaterijalaId).FirstOrDefault();
        }

        public async Task<StavkaRacuna> StavkeRacunaPoVrstiMaterijalaId(int SifraRacuna, int vrstaMaterijalaId)
        {
            return await _context.StavkeRacuna.Where(sr => sr.SifraRacuna == SifraRacuna && sr.VrstaMaterijalaId == vrstaMaterijalaId).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<int>> SveVrsteMaterijala(int sifraRacuna)
        {
            return await _context.StavkeRacuna.Where(sr => sr.SifraRacuna == sifraRacuna).Select(vm => vm.VrstaMaterijalaId).ToListAsync();
        }

        public int poslednjiId()
        {
            var poslednji = _context.StavkeRacuna.Max(sr => sr.StavkaRacunaId);
            return poslednji;
        }

        public void AzuriranjeVrsteMaterijalaNakonBrisanjaRacuna(StavkaRacuna stavkaRacuna)
        {
            var stavka = _context.VrsteMaterijala.Where(vm => vm.VrstaMaterijalaId == stavkaRacuna.VrstaMaterijalaId).FirstOrDefault();
            stavka.Kolicina += stavkaRacuna.Kolicina;

        }
    }
}
