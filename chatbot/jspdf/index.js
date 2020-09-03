global.window = {}

const fs = require('fs')
const jsPDF = require('jspdf/dist/jspdf.node.debug')
// jspdf/dist/jspdf.node.debug
const path = require('path')
// If you are not importing jsPDF with require('jspdf')
// you can apply the AutoTable plugin to any jsPDF with the
// applyPlugin function.
const { applyPlugin, Row } = require('jspdf-autotable/dist/jspdf.plugin.autotable')
const { generar } = require('../../db/Informe')

async function makeInforme() {
  applyPlugin(jsPDF)
  const doc = new jsPDF()
  const body = []
  const data = await generar()
  /* const data = [
    ['1', 'HelloäöüßÄÖÜ', 'dmoore0@furl.net', 'China'],
    ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine'],
    ['3', 'Ruth', 'rwells2@example.com', 'Trinidad'],
    ['4', 'Jason', 'jray3@psu.edu', 'Brazil'],
    ['5', 'Jane', 'jstephens4@go.com', 'United States'],
    ['6', 'Adam', 'anichols5@com.com', 'Canada'],
  ] */
  const head = [['Nº', 'Pregunta', 'Respuesta', 'Observaciones']]

  for (var i = 0; i < data.length; i++) {
    var row = []
    for (var key in data[i]) {
      row.push(data[i][key])
    }
    body.push(row)
  }
  const areas = []
  const tables = []

  for (let i = 0, j = 1; i < body.length; i++, j++) {
    if (j < body.length) {
      if (body[i][0] !== body[j][0]) {
        areas.push(body[i][0])
      }
    } else {
      areas.push(body[i][0])
    }
  }

  var finalY = doc.lastAutoTable.finalY || 14
  doc.setFontType('bold')

  doc.text('RESULTADOS DE LA AUDITORÍA POR ÁREAS CRÍTICAS', 14, finalY)
  for (const area of areas) {
    doc.setFontType('normal')
    finalY += 16 // ESPACIO
    let table = body.filter(record => record[0] === area)
    for (let index = 0; index < table.length; index++) table[index].splice(0, 1, (index + 1))
    doc.text(area, 14, finalY)
    finalY += 5 // ESPACIO
    doc.autoTable({
      startY: finalY,
      headStyles: { fillColor: [15, 76, 117] },
      head: head,
      body: table,
      theme: 'grid',
    })
    finalY = doc.lastAutoTable.finalY // ESPACIO
  }
  const out = doc.output()
  fs.writeFileSync(path.join(__dirname, '../../.tmp/reporte.pdf'), out, 'binary')
}

module.exports = makeInforme