- [ECMAScript](https://tc39.es/ecma262)
- [html.spec](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)
- [Nodejs Event Loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

https://www.jsv9000.app/

```js
  setTimeout(function a () {  
    console.error(4);  
  }, 0);
  
  new Promise(function b (resolve) {  
    console.error(1);  
  
    setTimeout(function c () {  
      console.error(2);  
      resolve();  
    }, 0);  
  })  
  .then(function d () {  
    console.error(3);
  });  
  
  console.error(0);  
  
// 1. Добавили ф-ю "a" как Macro-задачу в очередь: `console.error(4)`  
// 2. Выполняем синхронный код ф-ии "b" внутри `new Promise`: `console.error(1)`  
// 3. Добавили ф-ю "c" как Macro-задачу в очередь: `console.error(2); resolve();`  
// 4. Добавили ф-ю "d" как Micro-задачу из then в очередь: `console.log(3)` (выполнится после `console.error(2); resolve();`)  
// 5. Выполняем синхронный код: `console.error(0)`  
  
// Порядок: 1 --> 0 --> 4 --> 2 --> 3
```

```js
  new Promise(function a(resolve) {  
    console.error(1);  
  
    setTimeout(function b() {  
      console.error(2);  
      resolve();  
    }, 0);
  })  
  .then(function c() {  
    console.error(3);  
  });  
  
  setTimeout(function d () {  
    console.error(4);  
  }, 0);  
  
  console.error(0);  
  
// 1. Выполняем синхронный код внутри `new Promise`: `console.error(1)`  
// 2. Добавили Macro-задачу в очередь: `console.error(2); resolve();`  
// 3. Добавили Micro-задачу из then в очередь: `console.log(3)` (выполнится после `console.error(2); resolve();`)  
// 4. Добавили Macro-задачу в очередь: `console.error(4)`  
// 5. Выполняем синхронный код: `console.error(0)`  
  
// Порядок: 1 --> 0 --> 2 --> 3 --> 4
```
