# Jest

## Mocks

```javascript
const callback = jest.fn();
// callback.mock.calls
```

### Timer Mocks

```javascript
// This mocks out any call to setTimeout, setInterval with dummy functions
jest.useFakeTimers();

// Move the time ahead with 1 second
jest.runTimersToTime(duration);

expect(setTimeout).toHaveBeenCalledTimes(1);
```

### Async methods mocks

```javascript
function mockFetch(data) {
    window.fetch = () => {
        return Promise.resolve({json: () => Promise.resolve(data)});
    };
}
```

## Spy

```javascript
// ...component implementation
const spyDispatchEvent = jest.spyOn(component.element, 'dispatchEvent');
const [spyDispatchEventMethod] = spyDispatchEvent.mock.calls;

expect(spyDispatchEventMethod).toBeCalled();
```


