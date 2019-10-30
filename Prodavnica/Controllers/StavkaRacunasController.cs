using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Prodavnica.Common.Interfaces;
using Prodavnica.Common.Models;
using Prodavnica.DAL.Context;

namespace Prodavnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StavkaRacunasController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public StavkaRacunasController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/StavkaRacunas
        [HttpGet]
        public async Task<IEnumerable<StavkaRacuna>> GetStavkeRacuna()
        {
            return await _unitOfWork.StavkeRacuna.GetAllAsync();
        }

        //GET: api/StavkaRacunas/poslednji
        [HttpGet("poslednji")]
        public int poslednjiId()
        {
            return _unitOfWork.StavkeRacuna.poslednjiId();
        }

        // GET: api/StavkaRacunas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StavkaRacuna>> GetStavkaRacuna(int id)
        {
            var stavkaRacuna = await _unitOfWork.StavkeRacuna.GetAsync(id);

            if (stavkaRacuna == null)
            {
                return NotFound();
            }

            return stavkaRacuna;
        }

        //GET: api/StavkaRacunas/racun/sifraRacuna
        [HttpGet("racun/{SifraRacuna}")]
        public async Task<IEnumerable<StavkaRacuna>> StavkeRacunaPoSifriRacuna(int SifraRacuna)
        {
            return await _unitOfWork.StavkeRacuna.StavkeRacunaPoSifriRacuna(SifraRacuna);
        }

        //GET: api/StavkaRacunas/stavka/sifraRacuna
        [HttpGet("{SifraRacuna}/{vrstaMaterijalaId}")]
        public async Task<StavkaRacuna> StavkeRacunaPoVrstiMaterijalaId(int SifraRacuna, int vrstaMaterijalaId)
        {
            return await _unitOfWork.StavkeRacuna.StavkeRacunaPoVrstiMaterijalaId(SifraRacuna, vrstaMaterijalaId);
        }

        //GET: api/StavkaRacunas/vrstaMaterijalaId/sifraRacuna
        public async Task<IEnumerable<int>> SveVrsteMaterijala(int sifraRacuna)
        {
            return await _unitOfWork.StavkeRacuna.SveVrsteMaterijala(sifraRacuna);
        }

        // PUT: api/StavkaRacunas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStavkaRacuna(int id, StavkaRacuna stavkaRacuna)
        {
            var stavka = await _unitOfWork.StavkeRacuna.GetAsync(id);
            var racunStavke = await _unitOfWork.Racuni.RacunPoSifriRacuna(stavkaRacuna.SifraRacuna);
            var vrstaMaterijala =  _unitOfWork.StavkeRacuna.VrsteMaterijalaPoVrstaMaterijalaId(stavkaRacuna.VrstaMaterijalaId);


            stavkaRacuna.VrstaMaterijala = _unitOfWork.StavkeRacuna.VrsteMaterijalaPoVrstaMaterijalaId(stavkaRacuna.VrstaMaterijalaId);
            stavkaRacuna.StavkaRacunaId = id;
            stavkaRacuna.Cena = stavkaRacuna.VrstaMaterijala.Cena;

            if (id != stavkaRacuna.StavkaRacunaId)
            {
                return BadRequest();
            }

            if(stavka.Kolicina < stavkaRacuna.Kolicina)
            {
                var novaCena = Math.Round(((stavkaRacuna.Kolicina - stavka.Kolicina) * stavkaRacuna.Cena), 2);
                stavkaRacuna.Racun = racunStavke;
                stavkaRacuna.Racun.ukupanIznos += novaCena;
                _unitOfWork.StavkeRacuna.Remove(stavka);
                _unitOfWork.StavkeRacuna.Update(stavkaRacuna);

                if((stavkaRacuna.Kolicina - stavka.Kolicina) > vrstaMaterijala.Kolicina)
                    return BadRequest();
                else
                {
                    vrstaMaterijala.Kolicina -= (stavkaRacuna.Kolicina - stavka.Kolicina);
                    if (vrstaMaterijala.Kolicina < 0)
                        return BadRequest();
                }
            }
            else if(stavka.Kolicina > stavkaRacuna.Kolicina)
            {
                var novaCena = Math.Round(((stavka.Kolicina - stavkaRacuna.Kolicina) * stavkaRacuna.Cena), 2);
                stavkaRacuna.Racun = racunStavke;
                stavkaRacuna.Racun.ukupanIznos -= novaCena;
                _unitOfWork.StavkeRacuna.Remove(stavka);
                _unitOfWork.StavkeRacuna.Update(stavkaRacuna);
                vrstaMaterijala.Kolicina += (stavka.Kolicina - stavkaRacuna.Kolicina);
            }

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StavkaRacunaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetStavkaRacuna", new { id = stavkaRacuna.StavkaRacunaId }, stavkaRacuna);
        }

        // POST: api/StavkaRacunas
        [HttpPost]
        public async Task<ActionResult<StavkaRacuna>> PostStavkaRacuna(StavkaRacuna stavkaRacuna)
        {
            stavkaRacuna.VrstaMaterijala = _unitOfWork.StavkeRacuna.VrsteMaterijalaPoVrstaMaterijalaId(stavkaRacuna.VrstaMaterijalaId);
            stavkaRacuna.Cena = stavkaRacuna.VrstaMaterijala.Cena;
            var vrstaMaterijala = _unitOfWork.StavkeRacuna.VrsteMaterijalaPoVrstaMaterijalaId(stavkaRacuna.VrstaMaterijalaId);
            

            var racun = await _unitOfWork.Racuni.RacunPoSifriRacuna(stavkaRacuna.SifraRacuna);
            racun.ukupanIznos += (stavkaRacuna.Cena * stavkaRacuna.Kolicina);
            

            _unitOfWork.StavkeRacuna.Add(stavkaRacuna);
            _unitOfWork.StavkeRacuna.AzurirajVrstuMaterijala(stavkaRacuna);

            if(vrstaMaterijala.Kolicina<0)
            {
                return BadRequest();
            }
            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return CreatedAtAction("GetStavkaRacuna", new { id = stavkaRacuna.StavkaRacunaId }, stavkaRacuna);
        }

        // DELETE: api/StavkaRacunas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StavkaRacuna>> DeleteStavkaRacuna(int id)
        {
            var stavkaRacuna = await _unitOfWork.StavkeRacuna.GetAsync(id);
            if (stavkaRacuna == null)
            {
                return NotFound();
            }

            _unitOfWork.StavkeRacuna.SmanjenjeCeneRacunaNakonBrisanjaStavke(stavkaRacuna);
            _unitOfWork.StavkeRacuna.AzuriranjeVrsteMaterijalaNakonBrisanjaRacuna(stavkaRacuna);
            _unitOfWork.StavkeRacuna.Remove(stavkaRacuna);
            await _unitOfWork.SaveChangesAsync();

            return stavkaRacuna;
        }

        private bool StavkaRacunaExists(int id)
        {
            bool isNull = true;
            var stavkaRacuna = _unitOfWork.StavkeRacuna.Get(id);
            if (stavkaRacuna != null)
                isNull = false;

            return isNull ? false : true;
        }

        private bool RacunExsits(int id)
        {
            bool isNull = true;
            var racun = _unitOfWork.Racuni.Get(id);
            if (racun != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
