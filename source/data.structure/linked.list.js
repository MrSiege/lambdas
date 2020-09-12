import { head, tail } from '../collection';

/**
 * 数据结构-链表
 * 这里需要使用双向链表保证其在生产环境中的实用性
 */
class LinkedList {
  constructor(data = null, next = null){
    this.data = data;
    this.next = next;
  }

  static of(dataSource){
    if(dataSource.length === 0) return null;
    const rest = tail(dataSource);
    const linkedList = new LinkedList(head(dataSource));
    linkedList.next = LinkedList.of(rest);
    return linkedList;
  }
  
  delete(){
    
  }

  push(){

  }

  // 需要找出链表头
  map(f){
    for(let ip = this; ip != null; ip = ip.next) {
      const result = f(ip.data);
    };
  }

  find(){

  }

  filter(){

  }
}

export default LinkedList;