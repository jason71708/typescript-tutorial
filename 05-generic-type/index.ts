// 泛型各種用途
type Dictionary2<T> = {
  [prop: string]: T
}

interface LinkedList<T> {
  head: LinkedListNode<T> | null
  length: number
  at(index: number): LinkedListNode<T> | null
}

interface LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null
}

class TypeArray<T> {
  constructor(public values: T[]) { }
}

let correctDict: Dictionary2<boolean> = { // 動態指定型別
  wentToClub: true,
  playedGuitar: false
}

let wrongDict: Dictionary2<boolean> = { // 指定型別與賦值的型別不對
  wentToClub: 'yes',
  playedGuitar: 'no'
}

// 函式的泛型用法
type Operator<T> = (p1: T, p2: T) => T

let additionOperator: Operator<number> = function (p1, p2) {
  return p1 + p2
}

// 多重泛用參數 Multiple Generic Type Parameters
type TypeConversion<T, U> = (input: T) => U

let isPositive: TypeConversion<number, boolean> =
  function (input) {
    return input > 0
  }

// 內建的泛用型別 Built-in Generics
// Promise、Map 與 Set 等等也都是
let numericArray: number[] = [1, 2, 3]
let numericArray2: Array<number> = [1, 2, 3] // 陣列也是內建就可使用泛型表示

// Utility Types
// TypeScript 內建的型別方法，用泛型帶入型別方法便可轉換出對應的結果型別
// 比喻：就像 string 字串本身就有 toLowerCase 方法，執行便可以將字串轉小寫，不需要為了轉小寫而去自己寫函式。
// 型別方法有很多種：
// - Partial<Type>: 將 Type 中定義的屬性全都變成 optional
// - Required<Type>: 將 Type 中定義的屬性全都變成非 optional
// - 還有更多.....
interface PersonalInfo {
  name: string
  age?: number
  hasPet?: boolean
}

let validPersonalInfo: PersonalInfo = {
  name: 'Jax',
  hasPet: true
}

let validPersonalInfo2: Partial<PersonalInfo> = {} // 經 Partial 型別方法轉換過後，此型別內的屬性都是非必填

let wrongPersonalInfo: Required<PersonalInfo> = { // 經 Required 型別方法轉換過後，此型別內的屬性都是必填了
  name: 'Jax',
  hasPet: true
}

// 宣告的泛用化名裡面，沒有使用到宣告的型別參數，預設的 TypeScript 編譯器設定不會出現任何錯誤訊息，但還是建議讀者不要這樣亂宣告型別參數卻沒有使用。
// 除非你怕有闕漏，可以開啟 tsconfig.json 裡面的 noUnusedParameter 選項，它就會出現 Declared but never used 類似這樣的警告訊息。
type MultipleParamsGenericType<T1, T2, T3> = {
  t1: T1,
  t2: T2
}

let example: MultipleParamsGenericType<string, boolean, number> = {
  t1: 't1',
  t2: true
}

// 泛型參數缺一都不可，除非有定義預設型別
type MultipleParamsGenericType2<T1, T2, T3 = string> = {
  t1: T1,
  t2: T2,
  t3: T3
}

let example2: MultipleParamsGenericType2<string, boolean> = {
  t1: 't1',
  t2: true,
  t3: 't3'
}

let example3: MultipleParamsGenericType2<string> = {
  t1: 't1',
  t2: true,
  t3: 't3'
}

// 泛用化名之型別參數限制 Type Constraint
type Primitives = number | string | boolean | null | undefined

type PrimitiveArray<T extends Primitives> = Array<T>

let primitiveArray: PrimitiveArray<number | string | boolean> = ['string', true, 123]

let nonPrimitiveArray: PrimitiveArray<number | PersonalInfo> = [123, { // 限制給定的泛型參數在該 Primitives 範圍內
  name: 'Jax',
  hasPet: true
}]

//
function traverseElements<T>(
  values: Array<T>,
  callback: (el: T, index: number) => void
) {
  for (let i = 0; i < values.length; i += 1) {
    callback(values[i], i)
  }
}

let numberArrayInput = [2, 3, 4, 11, 34, 55]

let traverseCallback = function (el: number, index: number) {
  console.log(`Index ${index} - Value ${el}`)
}

traverseElements(numberArrayInput, traverseCallback) // TypeScript 也能從參數反推泛型出來，此地方就不需要額外寫 <T>

traverseElements<number>( // 簡化
  [2, 3, 4],
  function (el: number, index: number) {
    console.log(`Index ${index} - Value ${el}`)
  }
)

traverseElements( // 再簡化 (泛用型別的參數被指定後，函式內部的參數型別推論也跟著被固定。)
  [2, 4, 5],
  function (el, index) {
    console.log(`Index ${index} - Value ${el}`)
  }
)

// 類別泛型推論
class C<T> {
  constructor(public memberProps: T) { }

  public memberFunc() { return this.memberProps }

  get value() { return this.memberProps }

  set value(input: T) { this.memberProps = input }
}
const instanceOfC1 = new C<number>(666)
instanceOfC1.memberFunc()
instanceOfC1.value = 123
instanceOfC1.value = '123'

const instanceOfC2: C<string> = new C('666')
instanceOfC2.memberFunc()
instanceOfC2.value = '123'
instanceOfC2.value = 123

const instanceOfC3 = new C(true)
instanceOfC3.memberFunc()
instanceOfC3.value = false
instanceOfC3.value = 'false'

// 類別繼承泛型類別
class D extends C<number> { }
let newD = new D(123)
let newDD = new D('123')

class D2 extends C<I> { } // 這裡用 I 是因為 T 已經在其他檔案宣告過 T = void 了，所以此範例用 T 會不準
class E<I> extends C<I> { }

// 多泛型類別繼承各種混搭情況
class Cparent<I, K> {
  constructor(
    public member1: I,
    public member2: K
  ) { }
}
class Cchild1<I, K> extends Cparent<I, K> { }
class Cchild2<I, K = I> extends Cparent<I, K> { }
class Cchild3<I, K extends I> extends Cparent<I, K> { }

const child1 = new Cchild1(123, '123')
const child2 = new Cchild2<number>(123, '123')
const child3 = new Cchild3(123, '123')

// ES6 Map(), Set() 與泛型
let unspecifiedTypeMap1 = new Map() // 推論為 <any, any>
let unspecifiedTypeSet1 = new Set() // 推論為 <unknown>

unspecifiedTypeMap1.set('1', '1')
unspecifiedTypeSet1.add(true)

let unspecifiedTypeMap2 = new Map([[123, 'Hi']])
let unspecifiedTypeSet2 = new Set([1, 2, 3, 4, 'Hi'])

unspecifiedTypeMap2.set('1', '1')
unspecifiedTypeSet2.add(true)

// ES6 Promise() 與泛型
const unspecifiedTypePromise = new Promise((resolve, reject) => {
  resolve(true) // 就算 resolve 給一個值，也不會依照該值做型別推論
}) // 推論為 <unknown>

const resolvePromise = Promise.resolve(123) // 推論為 <number>
const rejectPromise = Promise.reject('false') // 不管給什麼值都會推論為 <never>
