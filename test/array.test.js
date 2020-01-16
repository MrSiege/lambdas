const arrays = require('../source/array');

test('arrays.nth', () => {
  const datasrouce = ['1', '2', '3'];
  
  expect(arrays.nth(datasrouce, 2)).toEqual(datasrouce[2]);
});

test('arrays.each', () => {
  const datasrouce = ['1', '2', '3'];
  const mockCallback = jest.fn();
  arrays.each(datasrouce, mockCallback);
  
  expect(mockCallback.mock.calls.length).toEqual(datasrouce.length);
  expect(mockCallback.mock.calls[0][0]).toEqual(datasrouce[0]);
});

test('arrays.map', () => {
  const datasrouce = ['1', '2', '3'];
  const mockCallback = jest.fn();
  arrays.map(datasrouce, mockCallback);
  const result = arrays.map(datasrouce, v => v);
  
  expect(mockCallback.mock.calls.length).toEqual(datasrouce.length);
  expect(mockCallback.mock.calls[0][0]).toEqual(datasrouce[0]);
  expect(result).toEqual(datasrouce);
});

test('arrays.construct', () => {
  const datasrouce = ['1', '2', '3'];
  const param = '0';
  
  expect(arrays.construct(param, datasrouce)).toEqual([param, ...datasrouce]);
});

test('arrays.sortBy', () => {
  const datasrouce = ['4', '2', '3'];
  const result = arrays.sortBy(datasrouce, v => v);
  
  expect(result).toEqual(['2', '3', '4']);
});

test('arrays.zip', () => {
  const datasrouce1 = ['1'];
  const datasrouce2 = ['1', '2'];
  const result = arrays.zip(datasrouce1, datasrouce2);
  
  expect(result).toEqual([['1', '1'], ['2']]);
});