require('colors');

const mostrarMenu = () => {
    
    return new Promise( resolve => {
        console.clear();
        console.log('======================'.green);
        console.log('Seleccione una opcion ');
        console.log('======================\n'.green);

        console.log(`${ '1.'.green } Crear Tarea`);
        console.log(`${ '2.'.green } Listar Tarea`);
        console.log(`${ '3.'.green } Listar Tarea Completadas`);
        console.log(`${ '4.'.green } Listar Tarea Pendientes`);
        console.log(`${ '5.'.green } Completar Tarea(s)`);
        console.log(`${ '6.'.green } Borrar Tarea`);
        console.log(`${ '0.'.green } Salir \n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Seleccione una opcion: ', (opt) => {
            readLine.close();
            resolve(opt);
        });
    });
}

const pausa = () => {
    return new Promise(resolve => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readLine.question(`\nPresione ${'ENTER'.blue} para continuar\n`, (opt) => {
            readLine.close();
            resolve();
        });
    });
}

module.exports = {
    mostrarMenu,
    pausa
}