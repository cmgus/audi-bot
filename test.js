const { join } = require('path')
const upload = require('./chatbot/drive/upload')
const makeInforme = require('./chatbot/jspdf/index')
const fs = require('fs')

async function test() {
    try {
        const out = await makeInforme()
        const data = await upload(out)
        console.log(data);
        console.log(data.webViewLink);
    } catch (error) {
        console.error(error.message);
    }
}

test()