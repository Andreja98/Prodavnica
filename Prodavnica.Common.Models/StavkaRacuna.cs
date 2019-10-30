using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Prodavnica.Common.Models
{
    [Table("StavkeRacuna")]
    public class StavkaRacuna
    {
        [Key]
        public int StavkaRacunaId { get; set; }
        public double Cena { get; set; }
        public int Kolicina { get; set; }
        public string NazivMaterijala { get; set; }
        public int VrstaMaterijalaId { get; set; }
        public virtual VrstaMaterijala VrstaMaterijala { get; set; }
        public int SifraRacuna { get; set; }
        public virtual Racun Racun { get; set; }
    }
}
