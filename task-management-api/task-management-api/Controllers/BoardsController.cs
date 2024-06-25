using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_management_api.Models;

namespace task_management_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BoardsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Boards
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardDTO>>> GetBoards()
        {
            return await _context.Boards
                                 .Select(b => new BoardDTO
                                 {
                                     BoardId = b.BoardId,
                                     BoardName = b.BoardName,
                                     UserId = b.UserId
                                 }).ToListAsync();
        }

        // GET: api/Boards/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardDTO>> GetBoard(int id)
        {
            var board = await _context.Boards
                                      .Where(b => b.BoardId == id)
                                      .Select(b => new BoardDTO
                                      {
                                          BoardId = b.BoardId,
                                          BoardName = b.BoardName,
                                          UserId = b.UserId
                                      }).FirstOrDefaultAsync();

            if (board == null)
            {
                return NotFound();
            }

            return board;
        }

        // PUT: api/Boards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoard(int id, BoardDTO boardDTO)
        {
            if (id != boardDTO.BoardId)
            {
                return BadRequest();
            }

            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }

            board.BoardName = boardDTO.BoardName;
            board.UserId = boardDTO.UserId;

            _context.Entry(board).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardExists(id))
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

        [HttpPost]
        public async Task<ActionResult<BoardDTO>> PostBoard(BoardDTO boardDTO)
        {
            var board = new Board
            {
                BoardName = boardDTO.BoardName,
                UserId = boardDTO.UserId
            };

            _context.Boards.Add(board);
            await _context.SaveChangesAsync();

            boardDTO.BoardId = board.BoardId;

            return CreatedAtAction("GetBoard", new { id = boardDTO.BoardId }, boardDTO);
        }

        // DELETE: api/Boards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoard(int id)
        {
            var board = await _context.Boards.FindAsync(id);
            if (board == null)
            {
                return NotFound();
            }

            _context.Boards.Remove(board);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BoardExists(int id)
        {
            return _context.Boards.Any(e => e.BoardId == id);
        }
    }
}
