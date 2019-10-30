using Microsoft.EntityFrameworkCore;
using Prodavnica.Common.Interfaces;
using Prodavnica.Common.Models;
using Prodavnica.DAL.Context;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Prodavnica.DAL.RepositoryPattern
{
    public class RacunRepository:Repository<Racun>, IRacunRepository
    {
        private readonly ProdavnicaContext _context;

        public RacunRepository(ProdavnicaContext context) : base(context)
        {
            _context = context;
        }

        public ProdavnicaContext context
        {
            get { return context as ProdavnicaContext; }
        }

        public IQueryable getRacunaSaStavkama(int sifraRacuna)
        {
            return _context.Racuni.Where(r => r.sifraRacuna == sifraRacuna)
                .Join(_context.StavkeRacuna,
                r => r.sifraRacuna, sr => sr.SifraRacuna,
                (r, sr) => new
                {
                    r.sifraRacuna,
                    r.datumIVremeIzdavanja,
                    r.ukupanIznos,
                    sr.VrstaMaterijalaId,
                    sr.Cena,
                    sr.Kolicina,
                    sr.StavkaRacunaId,
                    sr.VrstaMaterijala
                });
        }

        public async Task<Racun> RacunPoSifriRacuna(int sifraRacuna)
        {
            return await _context.Racuni.Where(r => r.sifraRacuna == sifraRacuna).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Object>> zaradaPoMesecimaZaGodinu(int godina)
        {
            return await _context.Racuni.Where(r => r.datumIVremeIzdavanja.Year == godina).GroupBy(m => m.datumIVremeIzdavanja.Month)
                   .Select(zm => new { Mesec = zm.Select(m => m.datumIVremeIzdavanja.ToString("MMMMM", new CultureInfo("sr"))).FirstOrDefault(),
                   zarada = zm.Sum(z=>z.ukupanIznos)}).ToListAsync();
        }

        public List<int> SveGodineIzdatihRacuna()
        {
            return _context.Racuni.Select(r => r.datumIVremeIzdavanja.Year).Distinct().ToList();
        }

        public async Task<IEnumerable<Object>> prodajaMaterijalaPoMesecima(int godina)
        {

            var upit = await _context.StavkeRacuna.Where(r=>r.Racun.datumIVremeIzdavanja.Year == godina)
                        .GroupBy(sr => sr.VrstaMaterijala.Naziv)
                        .Select(sra => new
                        {

                                   Naziv = sra.Select(x=>x.NazivMaterijala).FirstOrDefault(),
                                   ProdatoKomada = sra.Sum(x => x.Kolicina),
                                   Mesec = sra.Select(x=> x.Racun.datumIVremeIzdavanja.ToString("MMMMM", new CultureInfo("sr"))).FirstOrDefault()
                             
                        }).ToListAsync(); ;

            return upit;

        }
    }
}
