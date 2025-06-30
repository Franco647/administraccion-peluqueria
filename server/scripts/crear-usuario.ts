import bcrypt from 'bcryptjs';
import Usuario from '../src/models/usuario';
import db from '../src/db/connection';

const crearUsuario = async () => {
  await db.sync(); // conecta y sincroniza modelos

  const email = 'francothobokholt@gmail.com';
  const passwordPlano = 'admin@admin';
  const passwordHash = bcrypt.hashSync(passwordPlano, 10);

  await Usuario.create({
    email,
    password: passwordHash,
    nombre: 'Administrador',
    rol: 'usuario',
    activo: true
  });

  console.log('✅ Usuario creado con hash');
};

crearUsuario();
