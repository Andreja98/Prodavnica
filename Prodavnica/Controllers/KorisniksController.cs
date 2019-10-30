using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Prodavnica.Common.Interfaces;
using Prodavnica.Common.Models;
using Prodavnica.DAL.Context;

namespace Prodavnica.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KorisniksController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public KorisniksController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Korisniks
        [HttpGet]
        public async Task<IEnumerable<Korisnik>> GetKorisnici()
        {
            return await _unitOfWork.Korisnici.GetAllAsync();
        }

        // GET: api/Korisniks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Korisnik>> GetKorisnik(int id)
        {
            var korisnik = await _unitOfWork.Korisnici.GetAsync(id);
            var rola = await _unitOfWork.Role.GetAsync(korisnik.RolaId);
            korisnik.Rola = rola;

            if (korisnik == null)
            {
                return NotFound();
            }

            return korisnik;
        }

        // GET: api/Korisniks/poslednjiId
        [HttpGet("poslednjiId")]
        public int PoslednjiIdKorisnika()
        {
            return _unitOfWork.Korisnici.poslednjiIdKorisnika();
        }

        // PUT: api/Korisniks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKorisnik(int id, Korisnik korisnik)
        {
            var rola = await _unitOfWork.Role.GetAsync(korisnik.RolaId);
            korisnik.Rola = rola;
            if (id != korisnik.KorisnikId)
            {
                return BadRequest();
            }

            _unitOfWork.Korisnici.Update(korisnik);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KorisnikExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetKorisnik", new { id = korisnik.KorisnikId }, korisnik);
        }

        // POST: api/Korisniks
        [HttpPost]
        public async Task<ActionResult<Korisnik>> PostKorisnik(Korisnik korisnik)
        {
            if (KorisnikExists(korisnik.KorisnikId))
            {
                return BadRequest();
            }
            else
            {
                if ((DateTime.Now - korisnik.DatumRodjenja).TotalDays < 6570)
                    return BadRequest();

                _unitOfWork.Korisnici.Add(korisnik);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction("GetKorisnik", new { id = korisnik.KorisnikId }, korisnik);
            }
        }
        //POST: api/Korisniks/logovanje
        [HttpPost("{logovanje}")]
        
        public async Task<IActionResult> Login(Korisnik korisnik)
        {
            var trenutni = await _unitOfWork.Korisnici.login(korisnik);
            if (trenutni != null)
            {
                var rola = await _unitOfWork.Role.GetAsync(trenutni.RolaId);
                trenutni.Rola = rola;

                return Ok(new { trenutni });
            }
            else
            {
                return BadRequest();
            }
           
        }

        // DELETE: api/Korisniks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Korisnik>> DeleteKorisnik(int id)
        {
            var korisnik = await _unitOfWork.Korisnici.GetAsync(id);
            if (korisnik == null)
            {
                return NotFound();
            }

            _unitOfWork.Korisnici.Remove(korisnik);
            await _unitOfWork.SaveChangesAsync();

            return korisnik;
        }

        private bool KorisnikExists(int id)
        {
            bool isNull = true;
            var korisnik = _unitOfWork.Korisnici.Get(id);
            if (korisnik != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
