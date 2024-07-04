using Microsoft.EntityFrameworkCore;
using Models;
using System.Linq.Dynamic.Core;

namespace DA
{
    public class UsuarioDA
    {
        private ProyectoContext _context;

        public UsuarioDA(ProyectoContext context)
        {
            _context = context;
        }

        //Autenticar usuario
        public async Task<Usuario> AuthenticateUser(string email, string contraseña)
        {
            try
            {
                return await _context.Usuarios.Include(u => u.IdRolNavigation).FirstOrDefaultAsync(u => u.Email == email && u.Contraseña == contraseña);
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Email o Contraseña incorrectos");
            };
        }

        // Obtener usuario por email
        public async Task<Usuario> getUserByEmail(string email)
        {
            try
            {
                return await _context.Usuarios.Where(u => u.Email == email).FirstOrDefaultAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al buscar al usuario " + email);
            }
        }

        // Agregar usuario
        public async Task<int> createUser(Usuario usuario)
        {
            try
            {
                _context.Usuarios.Add(usuario);
                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al añadir el usuario " + usuario.ToString());
            }
        }

        // Editar usuario
        public async Task<int> editUser(string email, Usuario user)
        {
            try
            {
                Usuario existingUser = await getUserByEmail(email);
                existingUser.Nombre = user.Nombre;
                existingUser.Contraseña = user.Contraseña;


                return await _context.SaveChangesAsync();
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error encontrado al intentar actualizar el usuario:" + email);
            }
        }

        // Obtener rol del usuario por email
        public async Task<int> getUserRoleByEmail(string email)
        {
            try
            {
                var usuario = await _context.Usuarios.Include(u => u.IdRol).Where(u => u.Email == email).FirstOrDefaultAsync();
                return usuario.IdRol;
            }
            catch (Exception error)
            {
                Console.WriteLine(error.Message);
                throw new Exception("Error al obtener el rol del usuario " + email);
            }
        }
    }
}
