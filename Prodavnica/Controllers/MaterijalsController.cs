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
    public class MaterijalsController : ControllerBase
    {
        public IUnitOfWork _unitOfWork { get; }

        public MaterijalsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Materijals
        [HttpGet]
        public async Task<IEnumerable<Materijal>> GetMaterijali()
        {
            return await _unitOfWork.Materijali.GetAllAsync();
        }

        // GET: api/Materijals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Materijal>> GetMaterijal(int id)
        {
            var materijal = await _unitOfWork.Materijali.GetAsync(id);

            if (materijal == null)
            {
                return NotFound();
            }

            return materijal;
        }

        // PUT: api/Materijals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMaterijal(int id, Materijal materijal)
        {
            if (id != materijal.MaterijalId)
            {
                return BadRequest();
            }

            _unitOfWork.Materijali.Update(materijal);

            try
            {
                await _unitOfWork.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MaterijalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMaterijal", new { id = materijal.MaterijalId }, materijal);
        }

        // POST: api/Materijals
        [HttpPost]
        public async Task<ActionResult<Materijal>> PostMaterijal(Materijal materijal)
        {
            if (MaterijalExists(materijal.MaterijalId))
            {
                return BadRequest();
            }
            else
            {
                _unitOfWork.Materijali.Add(materijal);
                await _unitOfWork.SaveChangesAsync();

                return CreatedAtAction("GetMaterijal", new { id = materijal.MaterijalId }, materijal);
            }
        }

        // DELETE: api/Materijals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Materijal>> DeleteMaterijal(int id)
        {
            var materijal = await _unitOfWork.Materijali.GetAsync(id);
            if (materijal == null)
            {
                return NotFound();
            }

            _unitOfWork.Materijali.Remove(materijal);
            await _unitOfWork.SaveChangesAsync();

            return materijal;
        }

        private bool MaterijalExists(int id)
        {
            bool isNull = true;
            var materijal = _unitOfWork.Materijali.Get(id);
            if (materijal != null)
                isNull = false;

            return isNull ? false : true;
        }
    }
}
