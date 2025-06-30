import Cliente from './cliente';
import ClienteHistorial from './cliente-historial';
import Usuario from './usuario';

// Un cliente tiene muchos historiales
Cliente.hasMany(ClienteHistorial, {
  foreignKey: 'cliente_id',
  as: 'historial',
  onDelete: 'CASCADE',
});

// Cada historial pertenece a un cliente
ClienteHistorial.belongsTo(Cliente, {
  foreignKey: 'cliente_id',
  as: 'cliente',
  onDelete: 'CASCADE',
});

// LOGIN
// Usuario.hasMany(Usuario, {
//   foreignKey: 'usuario',
//   as: 'usuario',
//   onDelete: 'CASCADE',
// });

