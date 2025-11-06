import pool from '../config/db.js';

const selectClientes = async () => {

    const result = await pool.query('select * from clientes');
    return result[0];

    // o la forma guachi con restructuring
    /*
    const [result] = await pool.query('select * from clientes') ;
    return result ;
    */
}

const selectById = async (clienteId) => {
    // Cuando hacemos un query de un select, seimrpe vamos a recibir un array con 2 posiciones
    // con lo que podemos hacer un restructuring [result] y directamente cojer la primera posicion que viene con una etiqueta result
    const [result] = await pool.query('Select * From clientes WHERE id = ? ', [clienteId]);

    // Como la query es un select, la variable result recoge un array, pero yo no quiero develver un array si no ha encontrado nada
    // entonces vamos a tratar la respuesta
    /*
    if ( result.length!==0){
        return result[0] ; 
    } else {
        return null ;
    }
    */
    // O mejor ternario
    return result.length !== 0 ? result[0] : null;

}

const insertCliente = async ({ nombre, apellidos, edad, email, direccion, genero, cuota, fecha_nacimiento, dni }) => {
    const [result] = await pool.query('insert into clientes (nombre, apellidos, edad, email, direccion, genero, cuota, fecha_nacimiento, dni) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [nombre, apellidos, edad, email, direccion, genero, cuota, fecha_nacimiento, dni]);
    return result;
}
// TIP : 
// Una funciona ha de ser muy comoda al ejecutarse aunque no sea tanto en su diseño,
// ya que la vamos a ejecutar muchas veces y diseñar solo 1
const updateCliente = async (clienteId, { nombre, apellidos, edad, email, direccion, genero, cuota, fecha_nacimiento, dni }) => {
    const [result] = await pool.query(
        'UPDATE clientes SET nombre = ?, apellidos = ?, edad = ?, email = ?, direccion = ?, genero = ?, cuota = ?, fecha_nacimiento = ?, dni = ? WHERE id = ?',
        [nombre, apellidos, edad, email, direccion, genero, cuota, fecha_nacimiento, dni, clienteId]
    );
    return result;

}

const deleteById = async (clienteId) => {
    const [result] = await pool.query('DELETE From clientes WHERE id = ? ', [clienteId]);
    return result;
}

export default { selectClientes, selectById, insertCliente, updateCliente, deleteById }