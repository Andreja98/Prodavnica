using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Prodavnica.Common.Models
{
    [Table("VrsteMaterijala")]
    public class VrstaMaterijala
    {
        [Key]
        public int VrstaMaterijalaId { get; set; }
        public string SifraMaterijala { get; set; }
        public string Naziv { get; set; }
        public double Cena { get; set; }
        public int Kolicina { get; set; }
        public string Dobavljac { get; set; }
        public virtual Materijal Materijal { get; set; }
        public int MaterijalId { get; set; }
    }
}
