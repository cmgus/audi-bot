const db = require('.')

let generar = () => {
    return new Promise((resolve, reject) => {
        db.query(`
            select c.nombre, p.pregunta, r.respuesta, r.observacion 
            from cuestionarios c join preguntas p on p.id_cuestionario = c.id 
            join detalle_auditorias da on da.id_pregunta = p.id 
            join respuestas r on r.id = da.id_respuesta
        `, (err, res) => {
            if (err) return
            resolve(res.rows)
        })
    })
}

module.exports = {
    generar
}