// 實踐到的泛用介面必須確切指名該介面之型別參數的確切型別值。
interface CustomLinkedListNode<T> {
  value: T
  next: CustomLinkedListNode<T> | null
}

interface CustomLinkedList<U> {
  head: CustomLinkedListNode<U> | null
  length(): number
  at(index: number): CustomLinkedListNode<U> | null
  insert(index: number, value: U): void
  remove(index: number): void
}

export class GenericLinkedListNode<T> implements CustomLinkedListNode<T> {
  next: CustomLinkedListNode<T> | null = null

  constructor(public value: T) { }
}

export class GenericLinkedList<T> implements CustomLinkedList<T> {
  public head: CustomLinkedListNode<T> | null = null

  public length() { // 若 header 為空代表此長度為 0
    if (this.head === null) return 0

    let count = 0
    let currentNode: CustomLinkedListNode<T> | null = this.head

    while (currentNode !== null) {
      currentNode = currentNode.next
      count++
    }

    return count
  }

  public at(index: number): CustomLinkedListNode<T> | null {
    const length = this.length()

    if (index >= length) throw new Error('Index out of bound') // 若長度小於等於 index 則視為超過範圍錯誤

    let currentIndex = 0
    let currentNode = this.head as CustomLinkedListNode<T>

    while (currentIndex !== index) { // currentIndex 與目標 index 相同的話代表當前的 currentNode 就是要找的
      currentNode = currentNode.next as CustomLinkedListNode<T>
      currentIndex++
    }

    return currentNode
  }

  public insert(index: number, value: T) {
    const length = this.length()
    const newNode = new GenericLinkedListNode(value)

    if (length < index) throw new Error('Index out of bound') // 若長度小於 index 則視為超過可插入範圍錯誤
    else if (length === index) { // 剛好等於代表要插入新的節點
      if (index === 0) { // 空的要插入第一個節點
        this.head = newNode
      } else { // 插入最後位置
        const node = this.at(index - 1) as CustomLinkedListNode<T>
        node.next = newNode
      }
    } else { // 長度大於 index 代表要從中插入新的節點
      if (index === 0) { // 要插入到第一個，需將後面的串起來
        const originalHead = this.head
        this.head = newNode
        this.head.next = originalHead
      } else { // 插入中間，需將前後節點接起來
        const prevNode = this.at(index - 1) as CustomLinkedListNode<T>
        const originalNode = prevNode.next as CustomLinkedListNode<T>
        prevNode.next = newNode
        newNode.next = originalNode
      }
    }
  }

  public remove(index: number) {
    const length = this.length()

    if (length <= index) return // 若長度小於等於 index 則沒有節點可移除，直接 return 掉
    else if (index === 0) { // 代表要移除 head (前面沒節點)
      this.head = (this.head as CustomLinkedListNode<T>).next
    } else if (index === length - 1) { // 代表要移除最後一個節點 (後面沒節點)
      const prevNode = this.at(index - 1) as CustomLinkedListNode<T>
      prevNode.next = null
    } else { // 移除在中間的節點，將 prevNode 與 originalNode.next 接上
      const prevNode = this.at(index - 1) as CustomLinkedListNode<T>
      const originalNode = prevNode.next as CustomLinkedListNode<T>
      prevNode.next = originalNode.next
    }
  }

  public getInfo() {
    let currentNode = this.head
    let currentIndex = 0

    while (currentNode !== null) {
      console.log(`Index ${currentIndex}: ${currentNode.value}`)
      currentNode = currentNode.next
      currentIndex++
    }
  }
}

// test
const l = new GenericLinkedList<number>()
l.insert(0, 123)
l.insert(1, 456)
l.insert(2, 789)
l.insert(1, 45654)
l.getInfo()
console.log((l.at(0) as CustomLinkedListNode<number>).value)
console.log((l.at(1) as CustomLinkedListNode<number>).value)
console.log((l.at(2) as CustomLinkedListNode<number>).value)
console.log((l.at(3) as CustomLinkedListNode<number>).value)
// console.log((l.at(4) as CustomLinkedListNode<number>).value)

// 請問 specified 與 unspecified 版本的 TypeParamLinkedList 使用上各自差別會在哪？需要注意哪些事項？
const unspecifiedTypeParamLinkedList = new GenericLinkedList() // 推論結果為: GenericLinkedList<unknown>
unspecifiedTypeParamLinkedList.insert(0, 123)
unspecifiedTypeParamLinkedList.insert(1, 456)
unspecifiedTypeParamLinkedList.insert(2, 789)
unspecifiedTypeParamLinkedList.insert(1, 45654)
unspecifiedTypeParamLinkedList.getInfo()
console.log((unspecifiedTypeParamLinkedList.at(0) as CustomLinkedListNode<number>).value)
console.log((unspecifiedTypeParamLinkedList.at(1) as CustomLinkedListNode<number>).value)
console.log((unspecifiedTypeParamLinkedList.at(2) as CustomLinkedListNode<number>).value)
console.log((unspecifiedTypeParamLinkedList.at(3) as CustomLinkedListNode<number>).value)

type Test = {
  name: string
  age: number
}
const specifiedTypeParamLinkedList = new GenericLinkedList<Test>() // 推論結果為: GenericLinkedList<Test>
const testObject: Test = {
  name: 'test',
  age: 123
}
specifiedTypeParamLinkedList.insert(0, testObject)
specifiedTypeParamLinkedList.insert(1, testObject)
specifiedTypeParamLinkedList.insert(2, testObject)
specifiedTypeParamLinkedList.insert(1, testObject)
specifiedTypeParamLinkedList.getInfo()
console.log((specifiedTypeParamLinkedList.at(0) as CustomLinkedListNode<Test>).value)
console.log((specifiedTypeParamLinkedList.at(1) as CustomLinkedListNode<Test>).value)
console.log((specifiedTypeParamLinkedList.at(2) as CustomLinkedListNode<Test>).value)
console.log((specifiedTypeParamLinkedList.at(3) as CustomLinkedListNode<Test>).value)
