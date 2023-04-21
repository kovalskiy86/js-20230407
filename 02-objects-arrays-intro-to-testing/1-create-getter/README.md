# createGetter

Необходимо реализовать функцию "createGetter". Функция должна принимать строку вида 
"prop-1.prop-2.prop-n", где "prop-1, ..., prop-n" - это свойства объекта разделенные точкой.
Возвращать "createGetter" должна новую функцию, которая по заданному пути 
найдет значение в переданном ей объекте и вернет его.

```javascript
function createGetter(field) {
  /* ... */
}

const product = {
  category: {
    title: {
      name: 'John'
    }
  }
};

const getter = createGetter('category.title');

console.log(getter(product)); // { name: 'John' }
```
