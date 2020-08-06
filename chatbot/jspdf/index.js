global.window = {}

const fs = require('fs')
const jsPDF = require('jspdf/dist/jspdf.node.debug')
const utf8 = require('utf8')
// jspdf/dist/jspdf.node.debug
const path = require('path')
// If you are not importing jsPDF with require('jspdf')
// you can apply the AutoTable plugin to any jsPDF with the
// applyPlugin function.
const { applyPlugin } = require('jspdf-autotable/dist/jspdf.plugin.autotable')
const code = require('punycode')
// ../../dist/jspdf.plugin.autotable

async function makeInforme() {
  applyPlugin(jsPDF)
  const doc = new jsPDF()
  const body = []
  const data = [
    ['1', 'HelloäöüßÄÖÜ', 'dmoore0@furl.net', 'China', '211.56.242.221'],
    ['2', 'Janice', 'jhenry1@theatlantic.com', 'Ukraine', '38.36.7.199'],
    ['3', 'Ruth', 'rwells2@example.com', 'Trinidad', '19.162.133.184'],
    ['4', 'Jason', 'jray3@psu.edu', 'Brazil', '10.68.11.42'],
    ['5', 'Jane', 'jstephens4@go.com', 'United States', '47.32.129.71'],
    ['6', 'Adam', 'anichols5@com.com', 'Canada', '18.186.38.37'],
  ]
  let f = new Date()
  const head = [['ID', 'Name', 'Email', 'Country', `${f.getHours()}:${f.getMinutes()}`]]
  
  for (var i = 0; i < data.length; i++) {
    var row = []
    for (var key in data[i]) {
      row.push(data[i][key])
    }
    if (i % 3 === 0) {
      row.unshift({
        rowSpan: 3,
        content: i / 3 + 1,
        styles: { valign: 'middle', halign: 'center' },
      })
    }
    body.push(row)
  }
  var finalY = doc.lastAutoTable.finalY || 14
  doc.setFontType('bold')

  //const text = code.toASCII('Informe de Auditoría Técnia de Sistemas y Auditoría de Calidad')
  //console.log(text);
  doc.text('Informe de Auditoria Tecnica de Sistemas y Auditoria de Calidad', 14, finalY)
  // doc.text(text, 14, finalY)
  doc.setFontType('normal')
  doc.autoTable({
    startY: finalY + 10 ,
    headStyles: { fillColor: [15, 76, 117] },
    head: head,
    body: body,
    theme: 'grid',
  })
  const out = doc.output()
  return out
}

module.exports = makeInforme