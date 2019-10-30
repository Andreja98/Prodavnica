using Microsoft.EntityFrameworkCore;
using Prodavnica.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Prodavnica.DAL.Context
{
    public class ProdavnicaContext:DbContext
    {
        public ProdavnicaContext(DbContextOptions<ProdavnicaContext>options) : base(options)
        {

        }
        public DbSet<Materijal> Materijali { get; set; }
        public DbSet<VrstaMaterijala> VrsteMaterijala { get; set; }
        public DbSet<Racun> Racuni { get; set; }
        public DbSet<StavkaRacuna> StavkeRacuna { get; set; }
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Rola> Role { get; set; }
    }
}
