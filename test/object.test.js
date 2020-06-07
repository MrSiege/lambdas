import * as objects from '../source/object';

describe('objects', () => {
  test('objects.keys', () => {
    const datasource = {title: 'One Hundred Years of Solitude', author: 'Márquez'};
    const result1 = objects.keys(datasource);
    
    expect(result1).toEqual(['title', 'author']);
  });
  
  test('objects.values', () => {
    const datasource = {title: 'One Hundred Years of Solitude', author: 'Márquez'};
    const result1 = objects.values(datasource);
    
    expect(result1).toEqual(['One Hundred Years of Solitude', 'Márquez']);
  });
});