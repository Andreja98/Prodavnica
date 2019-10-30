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
    public class VrstaMaterijalasController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public VrstaMaterijalasController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/VrstaMaterijalas
        [HttpGet]
        public async Task<IEnumerable<VrstaMaterijala>> GetVrsteMaterijala()
        {
            return await _unitOfWork.VrsteMaterijala.GetAllAsync();
        }

        // GET: api/VrstaMaterijalas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VrstaMaterijala>> GetVrstaMaterijala(int id)
        {
            var vrstaMaterijala = await _unitOfWork.VrsteMaterijala.GetAsync(id);

            if (vrstaMaterijala == null)
            {
                return NotFound();
            }

            return vrstaMaterijala;
        }

        // GET: api/VrstaMaterijalas/materijal
        [HttpGet("materijal/{materijalId}")]
        public async Task<IEnumerable<VrstaMaterijala>> vrsteMaterijalaPoMaterijalId(int materijalId)
        {
            return await _unitOfWork.VrsteMaterijala.vrsteMaterijalaPoMaterijalId(materijalId);
        }

        // GET: api/VrstaMaterijala/vrsta
        [HttpGet("vrsta/{vrstaMaterijalaId}")]
        public double cenaPoVrstiMaterijala(int vrstaMaterijalaId)
        {
            return _unitOfWork.VrsteMaterijala.cenaPoVrstaMaterijalaId(vrstaMaterijalaId);
        }

        // PUT: api/VrstaMaterijalas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVrstaMaterijala(int id, VrstaMaterijala vrstaMaterijala)
        {
            if (id != vrstaMaterijala.VrstaMaterijalaId)
            {
                return BadRequest();
            }

            _unitOfWork.VrsteMaterijala.Update(vrstaMaterijala);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VrstaMaterijalaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVrstaMaterijala", new { id = vrstaMaterijala.VrstaMaterijalaId }, vrstaMaterijala);
        }

        // POST: api/VrstaMaterijalas
        [HttpPost]
        public async Task<ActionResult<VrstaMaterijala>> PostVrstaMaterijala(VrstaMaterijala vrstaMaterijala)
        {
            if(VrstaMaterijalaExists(vrstaMaterijala.VrstaMaterijalaId))
            {
                return BadRequest();
            }
            else
            {
                _unitOfWork.VrsteMaterijala.Add(vrstaMaterijala);
                await _unitOfWork.SaveChangesAsync();
            }

            return CreatedAtAction("GetVrstaMaterijala", new { id = vrstaMaterijala.VrstaMaterijalaId }, vrstaMaterijala);
        }

        // DELETE: api/VrstaMaterijalas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VrstaMaterijala>> DeleteVrstaMaterijala(int id)
        {
            var vrstaMaterijala = await _unitOfWork.VrsteMaterijala.GetAsync(id);

            if (vrstaMaterijala == null)
            {
                return NotFound();
            }

            _unitOfWork.VrsteMaterijala.Remove(vrstaMaterijala);
            await _unitOfWork.SaveChangesAsync();

            return vrstaMaterijala;
        }

        private bool VrstaMaterijalaExists(int id)
        {
            bool isNull = true;
            var vrstaMaterijala = _unitOfWork.VrsteMaterijala.Get(id);
            if (vrstaMaterijala != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
