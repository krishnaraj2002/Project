using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_management_api.Models;

namespace task_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgressController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProgressController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Progresses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProgressDTO>>> GetProgresses()
        {
            return await _context.Progresses
                                 .Select(p => new ProgressDTO
                                 {
                                     Id = p.Id,
                                     ProjectId = p.ProjectId,
                                     UserId = p.UserId,
                                     CompletionOfWork = p.CompletionOfWork
                                 }).ToListAsync();
        }

        // GET: api/Progresses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProgressDTO>> GetProgress(int id)
        {
            var progress = await _context.Progresses
                                         .Where(p => p.Id == id)
                                         .Select(p => new ProgressDTO
                                         {
                                             Id = p.Id,
                                             ProjectId = p.ProjectId,
                                             UserId = p.UserId,
                                             CompletionOfWork = p.CompletionOfWork
                                         }).FirstOrDefaultAsync();

            if (progress == null)
            {
                return NotFound();
            }

            return progress;
        }

        // PUT: api/Progresses/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProgress(int id, ProgressDTO progressDTO)
        {
            if (id != progressDTO.Id)
            {
                return BadRequest();
            }

            var progress = await _context.Progresses.FindAsync(id);
            if (progress == null)
            {
                return NotFound();
            }

            progress.ProjectId = progressDTO.ProjectId;
            progress.UserId = progressDTO.UserId;
            progress.CompletionOfWork = progressDTO.CompletionOfWork;

            _context.Entry(progress).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProgressExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Progresses
        [HttpPost]
        public async Task<ActionResult<ProgressDTO>> PostProgress(ProgressDTO progressDTO)
        {
            var progress = new Progress
            {
                ProjectId = progressDTO.ProjectId,
                UserId = progressDTO.UserId,
                CompletionOfWork = progressDTO.CompletionOfWork
            };

            _context.Progresses.Add(progress);
            await _context.SaveChangesAsync();

            progressDTO.Id = progress.Id;

            return CreatedAtAction("GetProgress", new { id = progressDTO.Id }, progressDTO);
        }

        // DELETE: api/Progresses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProgress(int id)
        {
            var progress = await _context.Progresses.FindAsync(id);
            if (progress == null)
            {
                return NotFound();
            }

            _context.Progresses.Remove(progress);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProgressExists(int id)
        {
            return _context.Progresses.Any(e => e.Id == id);
        }

    }
}


