using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_management_api.Models;

namespace task_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectAssignmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserProjectAssignmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/UserProjectAssignments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProjectAssignmentDTO>>> GetUserProjectAssignments()
        {
            return await _context.UserProjectAssignments
                                 .Select(u => new UserProjectAssignmentDTO
                                 {
                                     Id = u.Id,
                                     UserId = u.UserId,
                                     ProjectId = u.ProjectId,
                                     CreatedDate = u.CreatedDate,
                                     EndDate = u.EndDate
                                 }).ToListAsync();
        }

        // GET: api/UserProjectAssignments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserProjectAssignmentDTO>> GetUserProjectAssignment(int id)
        {
            var userProjectAssignment = await _context.UserProjectAssignments
                                                       .Where(u => u.Id == id)
                                                       .Select(u => new UserProjectAssignmentDTO
                                                       {
                                                           Id = u.Id,
                                                           UserId = u.UserId,
                                                           ProjectId = u.ProjectId,
                                                           CreatedDate = u.CreatedDate,
                                                           EndDate = u.EndDate
                                                       }).FirstOrDefaultAsync();

            if (userProjectAssignment == null)
            {
                return NotFound();
            }

            return userProjectAssignment;
        }

        // PUT: api/UserProjectAssignments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserProjectAssignment(int id, UserProjectAssignmentDTO userProjectAssignmentDTO)
        {
            if (id != userProjectAssignmentDTO.Id)
            {
                return BadRequest();
            }

            var userProjectAssignment = await _context.UserProjectAssignments.FindAsync(id);
            if (userProjectAssignment == null)
            {
                return NotFound();
            }

            userProjectAssignment.UserId = userProjectAssignmentDTO.UserId;
            userProjectAssignment.ProjectId = userProjectAssignmentDTO.ProjectId;
            userProjectAssignment.CreatedDate = userProjectAssignmentDTO.CreatedDate;
            userProjectAssignment.EndDate = userProjectAssignmentDTO.EndDate;

            _context.Entry(userProjectAssignment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserProjectAssignmentExists(id))
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

        // POST: api/UserProjectAssignments
        [HttpPost]
        public async Task<ActionResult<UserProjectAssignmentDTO>> PostUserProjectAssignment(UserProjectAssignmentDTO userProjectAssignmentDTO)
        {
            var userProjectAssignment = new UserProjectAssignment
            {
                UserId = userProjectAssignmentDTO.UserId,
                ProjectId = userProjectAssignmentDTO.ProjectId,
                CreatedDate = userProjectAssignmentDTO.CreatedDate,
                EndDate = userProjectAssignmentDTO.EndDate
            };

            _context.UserProjectAssignments.Add(userProjectAssignment);
            await _context.SaveChangesAsync();

            userProjectAssignmentDTO.Id = userProjectAssignment.Id;

            return CreatedAtAction("GetUserProjectAssignment", new { id = userProjectAssignmentDTO.Id }, userProjectAssignmentDTO);
        }

        // DELETE: api/UserProjectAssignments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserProjectAssignment(int id)
        {
            var userProjectAssignment = await _context.UserProjectAssignments.FindAsync(id);
            if (userProjectAssignment == null)
            {
                return NotFound();
            }

            _context.UserProjectAssignments.Remove(userProjectAssignment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserProjectAssignmentExists(int id)
        {
            return _context.UserProjectAssignments.Any(e => e.Id == id);
        }
    }
}
