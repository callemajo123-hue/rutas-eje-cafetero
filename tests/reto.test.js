/*
 * RETO · Pruebas propias para ordenarRutas(lista, criterio).
 * Patrón: Preparar, Ejecutar, Verificar.
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const { rutas } = require('../js/datos.js');
const { ordenarRutas } = require('../js/app.js');

// Ayuda: true si cada elemento es <= que el siguiente según la función comparar
const estaOrdenada = (lista, comparar) =>
  lista.every((actual, i) => i === 0 || comparar(lista[i - 1], actual) <= 0);

describe('RETO · ordenarRutas(lista, criterio)', () => {
  test('"nombre" ordena de A a Z respetando tildes', () => {
    // Preparar
    const lista = rutas;
    // Ejecutar
    const resultado = ordenarRutas(lista, 'nombre');
    // Verificar
    assert.equal(resultado[0].nombre, 'Ascenso al Nevado del Ruiz');
    assert.ok(estaOrdenada(resultado, (a, b) => a.nombre.localeCompare(b.nombre, 'es')));
  });

  test('"precio" ordena de menor a mayor y las gratis quedan primero', () => {
    // Preparar
    const lista = rutas;
    // Ejecutar
    const resultado = ordenarRutas(lista, 'precio');
    // Verificar
    assert.equal(resultado[0].precio, 0);
    assert.equal(resultado[1].precio, 0);
    assert.equal(resultado[resultado.length - 1].nombre, 'Ascenso al Nevado del Ruiz');
    assert.ok(estaOrdenada(resultado, (a, b) => a.precio - b.precio));
  });

  test('"duracion" ordena de menor a mayor duración', () => {
    // Preparar
    const lista = rutas;
    // Ejecutar
    const resultado = ordenarRutas(lista, 'duracion');
    // Verificar
    assert.equal(resultado[0].duracionHoras, 2);
    assert.equal(resultado[resultado.length - 1].duracionHoras, 10);
    assert.ok(estaOrdenada(resultado, (a, b) => a.duracionHoras - b.duracionHoras));
  });

  test('No modifica la lista original', () => {
    // Preparar
    const idsAntes = rutas.map((r) => r.id);
    // Ejecutar
    ordenarRutas(rutas, 'precio');
    ordenarRutas(rutas, 'nombre');
    // Verificar
    assert.deepEqual(rutas.map((r) => r.id), idsAntes);
  });

  test('Devuelve un arreglo NUEVO, no la misma referencia', () => {
    // Preparar / Ejecutar
    const resultado = ordenarRutas(rutas, 'duracion');
    // Verificar
    assert.notEqual(resultado, rutas);
    assert.equal(resultado.length, rutas.length);
  });

  test('Criterio desconocido o vacío devuelve una copia en el mismo orden', () => {
    // Preparar / Ejecutar
    const conVacio = ordenarRutas(rutas, '');
    const conOtro = ordenarRutas(rutas, 'estrellas');
    // Verificar
    assert.deepEqual(conVacio, rutas);
    assert.deepEqual(conOtro, rutas);
    assert.notEqual(conVacio, rutas);
  });

  test('Con una lista vacía devuelve []', () => {
    // Preparar / Ejecutar
    const resultado = ordenarRutas([], 'precio');
    // Verificar
    assert.deepEqual(resultado, []);
  });
});
