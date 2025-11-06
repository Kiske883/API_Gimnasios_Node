import ClientesModel from '../models/clientes.model.js';

const getAll = async (req, res) => {
    const clientes = await ClientesModel.selectClientes();
    res.json(clientes);
}

const getById = async (req, res) => {
    // En req.params vamos a tener la variable que jhemos especificado en routes
    // así que restructuramos req.params y listo

    const { clienteId } = req.params;

    const result = await ClientesModel.selectById(clienteId);

    if (!result) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result);
}

const create = async (req, res) => {

    // Aquí tendriamos que validar los datos
    const { insertId } = await ClientesModel.insertCliente(req.body);
    // Ojito que tal vez deberiamos protegernos
    const result = await ClientesModel.selectById(insertId);
    res.json(result);
}

const update = async (req, res) => {

    // Aqui tendriamos que hacer las validaciones de los datos requeridos

    const { clienteId } = req.params;

    await ClientesModel.updateCliente(clienteId, req.body);

    const result = await ClientesModel.selectById(clienteId);

    if (!result) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(result);
}

const deleteById = async (req, res) => {

    // Aqui tendriamos que hacer las validaciones de los datos requeridos

    const { clienteId } = req.params;
    const result = await ClientesModel.selectById(clienteId);
    await ClientesModel.deleteById(clienteId);

    if (!result) {
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }
        
    res.json(result);
}

export { getAll, getById, create, update, deleteById };
