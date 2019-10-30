using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Prodavnica.Common.Models
{
    [Table("Korisnici")]
    public class Korisnik
    {
        [Key]
        public int KorisnikId { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string KorisnickoIme { get; set; }
        public string JMBG { get; set; }
        public string Mail { get; set; }
        public string Lozinka { get; set; }
        public DateTime DatumRodjenja { get; set; }
        public string Pol { get; set; }
        public double Plata { get; set; }
        public int RolaId { get; set; }
        public virtual Rola Rola { get; set; }
    }
}
