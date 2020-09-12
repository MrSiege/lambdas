import { LinkedList } from '../../source/data.structure';
import { tap } from '../../source/combinators';

describe('data.structure LinkedList', () => {
  test('linkedList', () => {
    const linkedList = LinkedList.of([1, 2, 3, 4, 5, 6]);
    linkedList.map(({ data }) => console.log(data));
    //console.log(linkedList);
  });
});