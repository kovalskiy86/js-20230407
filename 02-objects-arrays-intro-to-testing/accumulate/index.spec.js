import { accumulate } from './index.js';

const data = [
  {
    title: "Соска (пустышка) NUK 10729357",
    description: "кольцо; Материал: силикон; Форма: ортодонтическая; Возраст: 0m+; Тип: пустышка",
    quantity: 20,
    price: 3,
    sales: 0
  },
  {
    title: "ТВ тюнер D-COLOR  DC1301HD",
    description: "Габариты (мм): 132х32х100; Пульт ДУ; USB; HDMI: 1 шт; композитный; Телетекст; Телегид; Time shift; Запись видео; Разрешение видео: 576i, 576p, 720p, 1080i, 1080p; DVB-T2 (эфирное); DVB-T (эфирное); Тип: внешний тюнер ",
    quantity: 90,
    price: 15,
    sales: 13
  },
  {
    title: "Детский велосипед Lexus Trike Racer Trike",
    description: "Вес: 9.5; Габариты: 84х47х105; сигнал/звонок; защитный козырек; ремни безопасности; защитный бампер; сумка для вещей; багажник; Комплектация: крылья; Подставка для ног; Родительская ручка; Колеса: резиновые; Диаметр колес (\"): 10; Материал рамы: сталь; Возрастная группа: от 1 до 3 лет; Тип: трехколесный ",
    quantity: 91,
    price: 53,
    sales: 11
  },
];

describe('objects-arrays-intro-to-testing/accumulate', () => {
  it('should return empty object if properties were not found', () => {
    expect(accumulate([], data)).toEqual({});
    expect(accumulate(['foo', 'bar'], data)).toEqual({});
  });

  it('should return empty object if data was not passed', () => {
    expect(accumulate([])).toEqual({});
  });

  it('should ignore not existed properties', () => {
    const config = [
      'sales',
      'foo'
    ];

    const result = {
      sales: [0, 13, 11]
    };

    expect(accumulate(config, data)).toEqual(result);
  });

  it('should return object with accumulated properties', () => {
    const config1 = [
      'title',
      'price',
      'sales'
    ];

    const result = {
      title: [
        'Соска (пустышка) NUK 10729357',
        'ТВ тюнер D-COLOR  DC1301HD',
        'Детский велосипед Lexus Trike Racer Trike'
      ],
      price: [3, 15, 53],
      sales: [0, 13, 11]
    };

    expect(accumulate(config1, data)).toEqual(result);
  });
});
