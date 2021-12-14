import { GenericLinkedList } from './LinkListNode'

interface CustomIterator<T> {
  // 筆者沒寫到
  // first(): T | null

  // next 方法為尋訪下一個元素
  // 輸出為 void 的理由是如果想要讀取該迭代器的內容，你必須使用 currentItem 這個屬性
  next(): void

  // 確認迭代器是否到終點
  isDone(): boolean

  // 迭代器目前迭代到的值
  currentItem: T | null | undefined
}

interface CustomIterable<T> {
  // 為 Factory Method，專門創建對應的 Iterator<T> 物件
  createIterator(): CustomIterator<T>
}

class NormalIterator<T> implements CustomIterator<T> {
  public currentItem: T | null | undefined = null
  private currentIndex = 0

  constructor(private items: Array<T>) {
    this.currentItem = items[0]
  }

  public isDone() {
    return this.currentItem === null || this.currentItem === undefined
  }

  public next() {
    if (this.isDone()) throw new Error('Iterator out of bound.')

    this.currentIndex++
    this.currentItem = this.items[this.currentIndex]
  }
}

class MyArray<T> implements CustomIterable<T> {
  constructor(public items: Array<T>) { }

  createIterator() {
    return new NormalIterator<T>(this.items)
  }
}

let aCollection = new MyArray<number>([1, 2, 3, 4, 5])
let anIterator = aCollection.createIterator()
while (!anIterator.isDone()) {
  console.log(`Iterated value: ${anIterator.currentItem}`)
  anIterator.next()
}
try {
  anIterator.next()
} catch (error) {
  console.log('Out of bound error caught!')
}

class IterableLinkedList<T> extends GenericLinkedList<T> implements CustomIterable<T> {
  public createIterator() {
    const elements: Array<T> = []

    let currentNode = this.head
    while (currentNode !== null) {
      elements.push(currentNode.value)
      currentNode = currentNode.next
    }

    return new NormalIterator(elements)
  }
}

// 這個行為在設計模式原著又有一個名稱 —— 多型巡訪（Polymorphic Iteration）
// 以下的 customForeach<T>，儘管來源是不同的聚合物，但是我們卻可以用同一個迭代方式去遍歷每一個元素，這個被稱為多型巡訪。
function customForeach<T>(iter: CustomIterator<T>, callback: (v: T) => void) {
  while (!iter.isDone()) {
    callback(iter.currentItem as T)
    iter.next()
  }
}

let collection1 = new MyArray([1, 2, 3])
let collection2 = new IterableLinkedList<number>()
collection2.insert(0, 1)
collection2.insert(1, 2)
collection2.insert(2, 3)

let iter1 = collection1.createIterator()
let iter2 = collection2.createIterator()
customForeach(iter1, v => console.log(`v from collection1: ${v}`))
customForeach(iter2, v => console.log(`v from collection2: ${v}`))


class BinaryTree<T> {
  constructor(public root: TreeNode<T>) { }

  // 宣告前序查詢的方法
  public preorderTraversal(callback: (el: TreeNode<T>) => void) {
    this.preorderRecursive(this.root, callback)
  }

  // 此為私有方法，使用遞迴實現前序查詢
  private preorderRecursive(
    node: TreeNode<T>,
    callback: (el: TreeNode<T>) => void
  ) {
    callback(node)
    if (node.leftNode) {
      this.preorderRecursive(node.leftNode, callback)
    }
    if (node.rightNode) {
      this.preorderRecursive(node.rightNode, callback)
    }
  }

  // 實踐 Iterable<T> 介面
  public createIterator() {
    const elements: Array<T> = []

    this.preorderTraversal(node => {
      elements.push(node.value)
    })

    return new NormalIterator(elements)
  }
}

class TreeNode<T> {
  public leftNode: TreeNode<T> | null | undefined = null
  public rightNode: TreeNode<T> | null | undefined = null
  public parent: TreeNode<T> | null | undefined = null

  constructor(public value: T) { }

  set left(value: T) {
    this.leftNode = new TreeNode(value)
    this.leftNode.parent = this
  }

  set right(value: T) {
    this.rightNode = new TreeNode(value)
    this.rightNode.parent = this
  }
}

type TN = TreeNode<number>

const root = new TreeNode(1)
const aBTree = new BinaryTree(root)

root.left = 2;
(root.leftNode as TN).left = 3;
(root.leftNode as TN).right = 4;
((root.leftNode as TN).rightNode as TN).left = 5;

root.right = 6;
(root.rightNode as TN).left = 7;
((root.rightNode as TN).leftNode as TN).left = 8;
((root.rightNode as TN).leftNode as TN).right = 9;
(((root.rightNode as TN).leftNode as TN).rightNode as TN).left = 10;

// 一般使用方法
console.log('Normal Usage:')
const valueCumulation1: Array<number> = []

aBTree.preorderTraversal(n => valueCumulation1.push(n.value))
console.log(valueCumulation1)

// 多型巡訪下的手法
console.log('Polymorphic Iteration:')
const valueCumulation2: Array<number> = []
const aBTreeIter = aBTree.createIterator()

customForeach(aBTreeIter, v => valueCumulation2.push(v))
console.log(valueCumulation2)
