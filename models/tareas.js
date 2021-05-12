const Tarea = require("./tarea");
require('colors');

class Tareas {
    _listado = null;

    get listadoArr(){
        const listado = [];

        // Llenar el arreglo con los objetos "tarea".
        Object.keys(this._listado).forEach( k => {
            listado.push(this._listado[k]);
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    crearTarea(desc = ''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    crearTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto(){
        // console.log(this._listado);
        // console.log(this.listadoArr);

        // Completado: Verde
        // Pendiente: Rojo

        //1. Alma :: Completada | Pendiente
        //2. Poder :: Completada | Pendiente
        //3. Realidad :: Completada | Pendiente

        let salida = '';
        this.listadoArr.forEach( (la, index ) => {
            const idx = `${index + 1}`.green;
            salida += `${ idx + '.'.green }. ${ la.desc } :: ${la.completadaEn ? 'Completada'.green : 'Pendiente'.red }\n`;
        });
        console.log(salida);
    }

    listarPendientesCompletadas( completadas = true){
        let salida = '';
        this.listadoArr.filter(x => completadas ? (x.completadaEn !== null) : (x.completadaEn === null))
            .forEach((tarea, indice) => {
                const idx = indice + 1;
                salida += `${ idx + '.'.green } ${ tarea.desc } :: ${tarea.completadaEn ? tarea.completadaEn.green : 'Pendiente'.red }\n`;
        });
        console.log(salida);
    }

    borrarTarea( id = '' ){
        if (this._listado[id] ){
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []){

        ids.forEach(id => {
            const tarea = this._listado[id];
            if ( !tarea.completadaEn ) {
                tarea.completadaEn = new Date().toISOString()
            }
        });

        // Desmarcar las que no esten en el listado de "ids".
        this.listadoArr.forEach(tarea => {
            if ( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadaEn = null;
            }
        });

    }
}

module.exports = Tareas;