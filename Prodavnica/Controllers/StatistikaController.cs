using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Prodavnica.Common.Interfaces;

namespace Prodavnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatistikaController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public StatistikaController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: /api/Statistika/2019
        [HttpGet("{godina}")]
        public async Task<IEnumerable<Object>> zaradaPoMesecimaZaGodinu(int godina)
        {
            return await _unitOfWork.Racuni.zaradaPoMesecimaZaGodinu(godina);
        }

        // GET: /api/Statistika
        [HttpGet]
        public List<int> SveGodineIzdatihRacuna()
        {
            return _unitOfWork.Racuni.SveGodineIzdatihRacuna();
        }

        // GET: /api/Statistika/prodaja/2019
        [HttpGet("prodaja/{godina}")]
        public Task<IEnumerable<Object>> prodajaMaterijalaPoMesecima(int godina)
        {
            return _unitOfWork.Racuni.prodajaMaterijalaPoMesecima(godina);
        }

    }
}