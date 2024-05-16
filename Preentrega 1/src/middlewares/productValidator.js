export const productValidator = (req, res, next) => {
    if (req.body.id || req.body.status != null) {
        res.status(404).json({ msg: 'No se debe enviar ID ni status, los mismos generan automáticamente en el servidor' })
    } else if (
        req.body.title === undefined ||
        req.body.description === undefined ||
        req.body.code === undefined ||
        req.body.price === undefined ||
        req.body.stock === undefined ||
        req.body.category === undefined
    ) res.status(404).json({ msg: 'Faltan datos de producto' });
    else next()
}
