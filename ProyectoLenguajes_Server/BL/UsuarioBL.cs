﻿using DA;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UsuarioBL
    {
        private UsuarioDA usuarioDA;

        public UsuarioBL(ProyectoContext context)
        {
            usuarioDA = new UsuarioDA(context);
        }

        //Autentica el usuario
        public async Task<Usuario> AuthenticateUser(string email, string password)
        {
            try
            {
                return await usuarioDA.AuthenticateUser(email, password);
            }
            catch (Exception error)
            {
                Console.WriteLine(error);
                throw;
            }
        }

        // Obtener usuario por Id
        public async Task<Usuario> getUserById(int userId)
        {
            try
            {
                return await usuarioDA.getUserById(userId);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener usuario por email
        public async Task<Usuario> getUserByEmail(string email)
        {
            try
            {
                return await usuarioDA.getUserByEmail(email);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Agregar usuario
        public async Task<int> createUser(Usuario usuario)
        {
            try
            {
                return await usuarioDA.createUser(usuario);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Editar usuario
        public async Task<int> editUser(int userId, Usuario user)
        {
            try
            {
                return await usuarioDA.editUser(userId, user);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }

        // Obtener rol del usuario por email
        public async Task<int> getUserRoleByEmail(string email)
        {
            try
            {
                return await usuarioDA.getUserRoleByEmail(email);
            }
            catch (Exception error)
            {
                throw new Exception(error.Message);
            }
        }
    }
}
