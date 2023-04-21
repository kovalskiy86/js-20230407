Необходимо передать в функцию такие параметры, при вызове с которыми
функция возвращает булевское значение "true"

```javascript
    function returnTrue0(a) {
        return a;
    }
    // true

    function returnTrue1(a) {
      return typeof a !== 'object' && !Array.isArray(a) && a.length === 4;
    }
    // 'true'

    function returnTrue2(a) {
        return a !== a;
    }
    // NaN

    function returnTrue3(a, b, c) {
        return a && a == b && b == c && a != c;
    }
    // "0", 0, ""
    // [], '', []

    function returnTrue4(a) {
        return (a++ !== a) && (a++ === a);
    }
    // 2 ** 53 - 1 

    function returnTrue5(a) {
        return a in a;
    }
    // [0]

    function returnTrue6(a) {
        return a[a] == a;
    }
    // [0]

    function returnTrue7(a, b) {
        return a === b && 1/a < 1/b; 
    }
    // -0, 0
```
