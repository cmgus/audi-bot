'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { google } = require('googleapis');
const { authenticate } = require('@google-cloud/local-auth');
const { dirname } = require('path');

const drive = google.drive('v3');

/* async function runSample(fileName) { */
async function runSample(binaryFile) {
    // Obtain user credentials to use for the request
    const auth = await authenticate({
        keyfilePath: path.join(__dirname, '../../oauth2.keys.json'),
        scopes: 'https://www.googleapis.com/auth/drive.file',
    });
    google.options({ auth });
    const f = new Date()
        const res = await drive.files.create(
            {
                requestBody: {
                    // a requestBody element is required if you want to use multipart
                    mimeType: 'application/pdf',
                    name: `reporte_audi ${f.getFullYear()}-${f.getMonth()}-${f.getDay()} ${f.getHours()}:${f.getMinutes()}.pdf`,
                },
                media: {
                    body: binaryFile
                },
            }
        );
    return res.data
}

module.exports = runSample;