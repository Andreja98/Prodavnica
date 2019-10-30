using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Prodavnica.Common.Models
{
    [Table("Racuni")]
    public class Racun
    {
        [Key]
        public int sifraRacuna { get; set; }
        public DateTime datumIVremeIzdavanja { get; set; }
        public double ukupanIznos { get; set; }
    }
}
