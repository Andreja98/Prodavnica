using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Prodavnica.Common.Models
{
    [Table("Materijali")]
    public class Materijal
    {
        public int MaterijalId { get; set; }
        public string Naziv { get; set; }
    }
}
