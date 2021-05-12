require('colors');
const { save, leerDb, crearTareasFromArray } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pause, 
    leerInput, 
    listadoTareasBorrar, 
    confirmar,
    mostrarListadoCheckList } = require('./helpers/inquirer');
const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');
//const { mostrarMenu, pausa } = require('./helpers/mensajes');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    
    const tareasDb = leerDb();
    
    if( tareasDb ){
        // Establecer las tareas
        tareas.crearTareasFromArray(tareasDb);
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': // Crear Tarea...
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
            break;
            case '2': // Listado Completo
                tareas.listadoCompleto();
            break;
            case '3': // Listar Completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': // Listar Pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            case '5': // Completado o Pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;
            case '6': // Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if( id !== '0' ){
                    const _confirmar = await confirmar('Esta seguro de que desa borrar el registro?');
                    if (_confirmar){
                        tareas.borrarTarea(id);
                    }
                }

            break;
            case '7':
                
            break;
            case '0':
                
            break;
        }

        save(tareas.listadoArr);

        await pause();
        
    } while (opt !== '0');
}

main();