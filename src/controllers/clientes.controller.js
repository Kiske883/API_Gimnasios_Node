import ClientesModel from '../models/clientes.model.js';

const getAll = async (req, res) => {
    const clientes = await ClientesModel.selectClientes();
    res.json(clientes) ;
}

const create = async (req, res) => {

    // Aquí tendriamos que validar los datos
    const { insertId } = await ClientesModel.insertCliente(req.body) ;
    // Ojito que tal vez deberiamos protegernos
    const result = await ClientesModel.selectById(insertId);
    res.json(result);
}

export { getAll, create };
