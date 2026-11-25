# Mis aprendizajes · Rutas del Eje

> Las pruebas automáticas dicen si tu código **funciona**. Este archivo muestra si **entiendes por qué funciona**.
> Responde con tus palabras, en 2 a 5 líneas por pregunta. No copies la documentación: explícala.
> En cada issue anota también **qué consultaste** (enlace) y **qué encontraste ahí**.
>
> Este archivo forma parte de la calificación del reto (criterio *Comprensión*).

**Aprendiz:** Maria Jose Calle

---

## Issue #1 · G1 Guía de estilo

**Consulté:**
- https://developer.mozilla.org/es/docs/Web/CSS/Using_CSS_custom_properties → las variables se declaran en `:root` con `--nombre` y se usan con `var(--nombre)`; se heredan a todo el documento.
- https://getbootstrap.com/docs/5.3/customize/css-variables/ → Bootstrap define en `:root` variables globales como `--bs-body-color` y `--bs-body-font-family`.
- https://getbootstrap.com/docs/5.3/components/buttons/#variables → cada botón lee sus propias variables `--bs-btn-*` (color, fondo, borde, hover, active).
- https://webaim.org/resources/contrastchecker/ → mide el contraste entre dos colores; para texto normal el mínimo AA es 4.5:1.

1. **Explica:** ¿qué ventaja tiene escribir los colores como variables en `:root` en vez de escribir el hex directamente en cada regla?
   Porque el color se escribe una sola vez. Si la marca cambia de verde, cambio `--eje-primario` en `:root` y se actualizan solos los botones, el precio, el hero y todo lo que use `var(--eje-primario)`. Además el nombre de la variable explica para qué es el color y evito escribir un hex distinto por error en cada lugar.

2. **Experimenta y explica:** en DevTools selecciona el botón "Ver rutas", pestaña *Computed* (o *Calculado*) y busca `--bs-btn-bg`. ¿De dónde sale su valor? ¿Por qué cambiar `--bs-primary` no habría cambiado el color del botón?
   En Computed, `--bs-btn-bg` vale `#1f5f3a`: sale de mi regla `.btn-primary { --bs-btn-bg: var(--eje-primario); }` en `estilos.css`, que a su vez lee el token de `:root`. Cambiar `--bs-primary` no bastaría porque el botón no lee esa variable: Bootstrap ya copió el color azul dentro de las variables propias del componente (`--bs-btn-bg`, `--bs-btn-border-color`, etc.), así que hay que sobrescribir esas.

3. **¿Qué pasaría si…** enlazas `estilos.css` ANTES de `bootstrap.min.css` en el `<head>`? Pruébalo, describe lo que ves y vuelve a dejarlo como estaba.
   Los botones vuelven al azul de Bootstrap, el fondo deja de ser crema y la fuente y el color del texto vuelven a los de Bootstrap. Pasa porque mis reglas y las de Bootstrap tienen la misma especificidad (`:root`, `.btn-primary`) y en CSS gana la que se declara de último: si Bootstrap carga después, pisa mis variables. La navbar sí conserva su color porque Bootstrap no define `--eje-secundario`. Lo dejé otra vez con `estilos.css` después de Bootstrap.

---

## Issue #2 · G2 Componentes

**Consulté:**
- https://getbootstrap.com/docs/5.3/components/navbar/#responsive-behaviors → la estructura `.navbar-toggler` + `.collapse.navbar-collapse` y que `.navbar-expand-md` despliega el menú desde 768 px.
- https://getbootstrap.com/docs/5.3/components/button-group/ → el grupo necesita `role="group"` y un `aria-label` para que el lector de pantalla sepa qué agrupa.
- https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Attributes/aria-pressed → `aria-pressed` indica si un botón de alternar está presionado (`true`) o no (`false`).
- https://developer.mozilla.org/es/docs/Web/HTML/Global_attributes/data-* → los atributos `data-*` guardan datos propios en el HTML y se leen desde JS con `dataset`.

1. **Explica:** ¿qué relación hay entre `data-bs-target="#menu"` en el botón y el `id="menu"` del div? ¿Quién lee ese atributo?
   `data-bs-target="#menu"` es un selector que apunta al elemento con `id="menu"`. El JavaScript de Bootstrap (`bootstrap.bundle.min.js`) lee `data-bs-toggle="collapse"` para saber que debe mostrar u ocultar algo, y `data-bs-target` para saber qué elemento. Si los dos no coinciden, el botón no abre nada.

2. **Experimenta:** abre y cierra el menú en un ancho de celular y observa en DevTools el atributo `aria-expanded` del botón. ¿Qué pasa con su valor? ¿Para quién es útil esa información?
   Empieza en `"false"`; al abrir el menú cambia a `"true"` y al cerrarlo vuelve a `"false"`. Lo cambia Bootstrap automáticamente, yo no escribí código para eso. Es útil para las personas que usan lector de pantalla: no ven el menú, pero el lector les anuncia si está expandido o contraído.

3. **¿Qué pasaría si…** en un botón de filtro escribes `data-tipo="café"` (con tilde)? Piensa en lo que hay en `datos.js` antes de responder.
   En `datos.js` el tipo está escrito `'cafe'`, sin tilde. El filtro compara con `===`, y `'café' === 'cafe'` es `false` porque son textos distintos. Entonces al hacer clic en ese botón no aparecería ninguna tarjeta y saldría "No encontramos rutas…". El valor de `data-tipo` tiene que ser exactamente igual al de los datos; la tilde solo va en el texto visible del botón.

---

## Issue #3 · G3 Datos → tarjetas

**Consulté:**
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals → las comillas invertidas permiten varias líneas e insertar expresiones con `${ }`.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map → `map()` devuelve un arreglo nuevo del mismo tamaño, con el resultado de la función para cada elemento.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/join → `join()` une el arreglo en un texto; si no le das separador usa la coma.
- https://developer.mozilla.org/es/docs/Web/API/Element/innerHTML → asignar `innerHTML` reemplaza todo el contenido anterior del elemento.

1. **Predice y comprueba:** antes de ejecutarlas en la consola del navegador, escribe qué crees que devuelve cada línea. Después ejecútalas y anota el resultado real.
   ```js
   [1, 2, 3].map((n) => n * 10)
   ['a', 'b', 'c'].join('')
   ['a', 'b', 'c'].join(' - ')
   rutas.map((r) => r.nombre).length
   ```
   | Línea | Mi predicción | Resultado real |
   |---|---|---|
   | 1 | `[10, 20, 30]` | `[10, 20, 30]` |
   | 2 | `'abc'` | `'abc'` |
   | 3 | `'a - b - c'` | `'a - b - c'` |
   | 4 | `11` | `11` |

2. **Experimenta y explica:** quita temporalmente `.join('')` de `pintarRutas`. ¿Qué aparece entre las tarjetas y por qué? (Pista: ¿qué hace `innerHTML` cuando le asignas un arreglo?). Vuelve a ponerlo.
   Aparecen comas sueltas entre las tarjetas. `map(crearCard)` devuelve un arreglo de textos, pero `innerHTML` necesita un texto; al asignarle un arreglo, JavaScript lo convierte solo con `toString()`, que funciona como `join(',')`, y por eso queda una coma entre cada tarjeta. Con `join('')` las uno sin ningún separador.

3. **Explica:** ¿por qué la tarjeta se escribe con comillas invertidas `` ` `` y no con comillas simples `' '`? ¿Qué hace `${ }`?
   Porque el template literal deja escribir el HTML en varias líneas, tal como se ve la tarjeta modelo, y dentro de `${ }` puedo poner cualquier expresión de JS (`ruta.nombre`, `formatearPrecio(ruta.precio)`) y su valor se inserta en el texto. Con comillas simples no se puede saltar de línea y `${ruta.nombre}` saldría escrito tal cual, sin reemplazarse.

---

## Issue #4 · G4 Filtros y eventos

**Consulté:**
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter → `filter()` devuelve un arreglo nuevo con los elementos que cumplen la condición y no modifica el original.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions → una flecha sin llaves devuelve el valor sola; con llaves necesita `return`.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/includes → `includes()` dice si un texto contiene a otro (distingue mayúsculas, por eso normalizamos).
- https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener → registra una función que se ejecuta cuando ocurre el evento.
- https://developer.mozilla.org/es/docs/Web/API/Element/input_event → `input` se dispara con cada cambio del valor; `change` solo cuando se confirma.
- https://developer.mozilla.org/es/docs/Web/API/HTMLElement/dataset → `boton.dataset.tipo` lee el atributo `data-tipo`.
- https://developer.mozilla.org/es/docs/Web/Accessibility/ARIA/Attributes/aria-live → con `polite` el lector anuncia el cambio cuando termina lo que está leyendo, sin mover el foco.

1. **Predice y comprueba:** después de ejecutar `filtrarPorTipo(rutas, 'cafe')` en la consola, ¿cuánto vale `rutas.length`? ¿Por qué?
   `filtrarPorTipo(rutas, 'cafe')` devuelve un arreglo de 2 rutas, pero `rutas.length` sigue valiendo 11. `filter()` no modifica el arreglo original: crea uno nuevo solo con los elementos que cumplen la condición. Por eso siempre puedo volver a "Todas" sin haber perdido datos.

2. **Explica el recorrido:** describe paso a paso qué pasa desde que la persona hace clic en el botón "Cultura" hasta que aparecen las tarjetas nuevas. Menciona: el evento, `estado`, `aplicarFiltros()`, `filtrarPorTipo()` y `pintarRutas()`.
   1. La persona hace clic en "Cultura" y se dispara el evento `click` que registré con `addEventListener` en `iniciar()`.
   2. El listener guarda `boton.dataset.tipo` (`'cultura'`) en `estado.tipo`, le pone `active` y `aria-pressed="true"` a ese botón y se los quita a los demás.
   3. Llama a `aplicarFiltros()`, que parte siempre del arreglo completo `rutas`.
   4. `filtrarPorTipo(rutas, 'cultura')` deja solo las rutas de cultura; después `buscarPorTexto()` aplica lo que haya escrito en el buscador (`estado.texto`) y `ordenarRutas()` el orden elegido.
   5. `pintarRutas()` convierte ese resultado en tarjetas con `map(crearCard).join('')`, reemplaza el `innerHTML` de `#lista-rutas` y cambia el mensaje a "3 rutas encontradas", que el lector de pantalla anuncia gracias a `aria-live`.

3. **¿Qué pasaría si…** usas el evento `'change'` en lugar de `'input'` en el buscador? Pruébalo y describe la diferencia.
   Con `input` las tarjetas se filtran mientras escribo, letra por letra. Con `change` no pasa nada mientras escribo: solo se actualiza cuando presiono Enter o salgo del campo (con Tab o haciendo clic afuera). Para un buscador es mejor `input` porque da resultados inmediatos; lo dejé otra vez en `input`.

---

## Reto · Ordenar rutas

**Consulté:**
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort → `sort()` ordena el arreglo en el mismo lugar (lo modifica) y usa una función de comparación que devuelve negativo, cero o positivo.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare → compara textos según el idioma (`'es'`), así las tildes se ordenan bien.
- https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax → `[...lista]` crea un arreglo nuevo con los mismos elementos.
- https://developer.mozilla.org/es/docs/Web/API/HTMLElement/change_event → en un `<select>`, `change` se dispara al elegir una opción.
- https://nodejs.org/api/test.html y https://nodejs.org/api/assert.html → `describe()`, `test()`, `assert.equal`, `assert.deepEqual` y `assert.notEqual`.

1. **Explica:** ¿por qué `ordenarRutas` hace `const copia = [...lista]` antes de `sort()`? ¿Qué le pasaría a `rutas` si no se copia? ¿Qué prueba tuya lo demuestra?
   Porque `sort()`, a diferencia de `map()` y `filter()`, modifica el arreglo sobre el que se llama. Si ordenara `lista` directamente, cuando le paso `rutas` el arreglo original quedaría reordenado para siempre, y al elegir "Sin orden" ya no volvería al orden de `datos.js`. Lo demuestra la prueba "No modifica la lista original": guarda los `id` antes, ordena por precio y por nombre, y comprueba que los `id` de `rutas` siguen en el mismo orden.

2. **Explica:** en `copia.sort((a, b) => a.precio - b.precio)`, ¿qué significa que la función devuelva un número negativo, cero o positivo?
   `sort()` compara dos rutas `a` y `b` y mira el número que devuelve la función: si es negativo, `a` va antes que `b`; si es positivo, `b` va antes que `a`; si es cero, se dejan en el orden que tenían. Con `a.precio - b.precio`, si `a` es más barata el resultado es negativo y queda primero, por eso el orden es de menor a mayor.

3. **Tus pruebas:** elige una de tus pruebas y explica qué error de programación detectaría si alguien dañara la función.
   La prueba "precio ordena de menor a mayor y las gratis quedan primero". Si alguien escribe `b.precio - a.precio` por error, el orden queda de mayor a menor: el primer elemento sería el Ascenso al Nevado del Ruiz ($150.000) y no una ruta gratis, así que `assert.equal(resultado[0].precio, 0)` falla. Y si alguien quita la copia `[...lista]`, falla la prueba "No modifica la lista original".
