const argv = require('./config/yargs').argv;
const colores = require('colors');

const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'borrar':
        let borrado = porHacer.borrar(argv.descripcion);
        if (borrado) {
            console.log(`La tarea ${argv.descripcion} ha sido borrada`.green);
        } else {
            console.log(`Error al borrar la tarea ${argv.descripcion}`.red);
        }
    case 'actualizar':
        let hecho = porHacer.actualizar(argv.descripcion, argv.completado);
        if (hecho) {
            console.log(`La tarea ${argv.descripcion} ha sido actualizada`.green);
        } else {
            console.log(`Error al actualizar la tarea ${argv.descripcion}`.red);
        }
        break;
    case 'listar':
        let lista = porHacer.listar();

        console.log('*********TAREAS**********'.white);

        for (let tarea of lista) {
            console.log(`Tarea: ${tarea.descripcion}`);

            if (tarea.completado == false) {
                console.log(`Estado: No completado`.red);
            } else {
                console.log(`Estado: Completado`.green);
            }

            console.log('***************************'.white);
        }
        break;
    default:
        console.log('Comando no reconocido');
        break;
}