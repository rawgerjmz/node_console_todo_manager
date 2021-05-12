const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1'.green }. Crear Tarea`
            },
            {
                value: '2',
                name: `${ '2'.green }. Listar Tareas`
            },
            {
                value: '3',
                name: `${ '3'.green }. Listar Tarea Completadas`
            },
            {
                value: '4',
                name: `${ '4'.green }. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5'.green }. Completar Tarea`
            },
            {
                value: '6',
                name: `${ '6'.green }. Borrar Tarea`
            },
            {
                value: '0',
                name: `${ '0'.green }. Salir`
            }
        ]
    }
];
const pauseOption = [
    {
        type: 'input',
        name: 'pause',
        message: `Presione ${'ENTER'.green} para continuar.`
    }
];

const inquirerMenu = async() => {
    //console.clear();
    console.log('======================'.green);
    console.log('Seleccione una opcion ');
    console.log('======================\n'.green);

    const { opcion } = await inquirer.prompt(questions);
    return opcion;
}

const pause = async() => {
    const pausar = await inquirer.prompt(pauseOption);
    return pausar;
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if ( value.length === 0 || value.trim().length === 0){
                    return 'Por favor, ingrese un valor.'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map(
        (tarea, indice) => {
            const idx = `${indice + 1}.`.green;
            return {
                value: tarea.id,
                name:  `${idx} ${tarea.desc}`
            }
        }
    );

    // Inserta un elemento a un arreglo al inicio.
    choices.unshift({
        value: '0',
        name: 'Salir'.green
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( mensaje ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: mensaje
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map(
        (tarea, indice) => {
            const idx = `${indice + 1}.`.green;
            return {
                value: tarea.id,
                name:  `${idx} ${tarea.desc}`,
                checked: ( tarea.completadaEn ) ? true : false
            }
        }
    );

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu, pause, leerInput, listadoTareasBorrar, confirmar, mostrarListadoCheckList
}
