import { getCoorStr } from '../../utils';

test('Объект должен возращать координаты', () => {
  const result = getCoorStr('51.50851,-0.12572');
  expect(result).toBe('51.50851,-0.12572');
});

test('Объект должен возращать координаты', () => {
  const result = getCoorStr(' 51.50851  ,  -0.12572   ');
  expect(result).toBe('51.50851,-0.12572');
});

test('Объект не должен возращать координаты', () => {
  const result = getCoorStr('51.50851,-0.12572ь');
  expect(result).toBe(undefined);
});

test('Объект не должен возращать координаты', () => {
  const result = getCoorStr('Координаты');
  expect(result).toBe(undefined);
});

test('Объект не должен возращать координаты', () => {
  const result = getCoorStr('51.50851');
  expect(result).toBe(undefined);
});

test('Объект не должен возращать координаты', () => {
  const result = getCoorStr('51.50851, 51.50851, -0.12572');
  expect(result).toBe(undefined);
});
