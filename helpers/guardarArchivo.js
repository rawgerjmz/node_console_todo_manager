const fs = require('fs');
const archivo = './db/data.json';

const save = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

const leerDb = () => {
    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync(archivo,{ encoding: 'utf-8' });
    return JSON.parse(info);
}

module.exports = { save, leerDb };