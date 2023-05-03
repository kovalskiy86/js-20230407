### Спрятать элемент

```javascript
// Anti-pattern
const element = document.getElementById('root');

element.style.display = 'none';
```

```javascript
// Better solution
const element = document.getElementById('root');

element.classList.add('hide');
```

### Вставка элементов в элемент/страницу

```javascript
// Anti-pattern
for (let i = 0; i < 10; i++) {
  document.body.innerHTML += i + ',';
}
```

```javascript
// Better solution
let result = '';

for (let i = 0; i < 10; i++) {
 result += i + ',';
}

document.body.textContent = result;
```

```javascript
// Anti-pattern
console.time('timer');
for (let i = 0; i < 10000; i++) {
  const element = document.createElement('p');

  element.textContent = i;
  document.body.append(element);
}
console.timeEnd('timer');
```

```javascript
// Better solution
console.time('timer');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 10000; i++) {
  const element = document.createElement('p');

  element.textContent = i;
  fragment.append(element);
}

document.body.append(fragment);
console.timeEnd('timer');
```

### Создание элементов
```javascript
// Anti-pattern
const div = document.createElement('div');
const p = document.createElement('p');
const pText = document.createTextNode('Hello World!');

div.className = 'container';

p.append(pText);
div.append(p);

document.body.append(div);
```

```javascript
// Better solution
document.body.innerHTML = `
  <div class="container">
    <p>
      Hello World!
    </p>
  </div>
`;
```

### Выборка элементов из DOM
```javascript
// Anti-pattern
const div = document.getElementById('root');
const p = document.querySelectorAll('#root .container');
```

```javascript
// Better solution
const div = document.getElementById('root');
const containers = div.querySelectorAll('.container'); 
```

### Изменение элементов DOM дерева
```javascript
// Anti-pattern
console.time('timer');

const div = document.getElementById('root');
const containers = div.querySelectorAll('.container');

containers.forEach(item => {
  item.textContent = 1;
});

console.timeEnd('timer');
```

```javascript
// Better solution
console.time('timer');

const div = document.getElementById('root');
const divClone = div.cloneNode(true);
const containers = divClone.querySelectorAll('.container');

containers.forEach(item => {
  item.textContent = 1;
});
div.replaceWith(divClone);

console.timeEnd('timer');
```
