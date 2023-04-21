Необходимо передать в функцию такие параметры, при вызове с которыми
функция возвращает булевское значение "true"

```javascript
    function returnTrue0(a) {
      return a;
    }

    function returnTrue1(a) {
      return typeof a !== 'object' && !Array.isArray(a) && a.length === 4;
    }

    function returnTrue2(a) {
      return a !== a;
    }

    function returnTrue3(a, b, c) {
      return a && a == b && b == c && a != c;
    }

    function returnTrue4(a) {
      return (a++ !== a) && (a++ === a);
    }

    function returnTrue5(a) {
      return a in a;
    }

    function returnTrue6(a) {
      return a[a] == a;
    }

    function returnTrue7(a, b) {
      return a === b && 1/a < 1/b; 
    }
```
