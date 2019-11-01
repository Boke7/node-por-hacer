const fs = require('fs');
const colors = require('colors');

let listado = [];

const guardarDB = () => {
    let data = JSON.stringify(listado);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error al guardar', err);
    });
}

const cargarDB = () => {
    try {

        listado = require('../db/data.json');

    } catch (error) {
        listado = [];
    }

}

const listar = () => {
    cargarDB();

    return listado;
}


const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listado.push(porHacer);

    guardarDB();

    return listado;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listado.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listado[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listado.filter(tarea => tarea.descripcion !== descripcion);

    if (listado.length === nuevoListado.length) {
        return false;
    } else {
        listado = nuevoListado;
        guardarDB();
        return true;
    }

}

module.exports = {
    crear,
    listar,
    actualizar,
    borrar
}