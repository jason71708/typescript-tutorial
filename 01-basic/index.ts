let myName = 'Maxwell';
let age = 20;
let hasPet = false;
let nothing = undefined; // Nullable Types 被推論為 any
let nothingLiterally = null; // Nullable Types 被推論為 any

myName = 123 // 由於自動推論 myName 為字串，故賦予數字時會報錯

// any 可賦予各種型別
nothingLiterally = 'hi'
nothingLiterally = { name: 'hi', age: 20 }

// 遲滯性指派 Delayed Initialization:
// 若先定義但不賦值則會自動推論為 any
// (在 JS 先定義但不賦值，此變數會是 undefine，所以 Nullable Types 推論為 any 合理)
let messageToSend

// 為避免 any 型別的狀態發生
// 這些被指派 Nullable Types 的變數或者不立即被指派值的變數做型別註記
let absoluteNothing: undefined
let literallyabsoluteNothing: null

// 有做型別註記後就不會被推論為 any 而能正確限制了
absoluteNothing = '123'
literallyabsoluteNothing = 123

// 使用 union，將變數註記為 null 或是字串
let absoluteEitherNullOrString: null | string
absoluteEitherNullOrString = '123'
absoluteEitherNullOrString = null

let info = {
  name: 'Jason',
  age: 22,
  hasPet: true
}

// 在物件內 Nullable Type 作為屬性值不會推論成 any
let someone = {
  knows: undefined,
  identity: null
}

// 整個換掉：多一鍵少一鍵都會錯
info = {
  name: 'Alex',
  age: 33
}
someone = {
  knows: undefined,
  identity: null,
  other: '123'
}
// 新增不明的值也會報錯
info.other = '123'

// delete 物件屬性在 TS4 終於有支援檢查了！限制只能 delete optional 的屬性
interface Person {
  name: string
  age: number
  hasPet?: boolean
}
let person: Person = {
  name: 'John',
  age: 123,
  hasPet: true
}
delete person.hasPet
delete person.age

let obj1 = { hello: 'World' }
let obj2 = { ...obj1, goodbye: 'Cruel World' }

// Object.assign 需設定 es2015 以上環境才可以使用
// "lib": ["es2015", "dom"]
// Object.assign 出來的物件，推論的型別會是用 & 連接
let obj3 = { hello: 'Another World' };
let obj4 = Object.assign(obj3, {
  goodbye: 'Cruel World'
})

// TS 認為 object 型別指的是任何 JS 物件，僅可以整個覆寫，不允許對該物件做細部微調
let justAnObject: object = { hello: 'world' }
justAnObject.hello = 'max'
justAnObject.hello = null
justAnObject = { goodbye: 'hi' }
justAnObject.newProp = 123

// 用廣義的 Object 都可以覆寫：物件完整性
justAnObject = 123
justAnObject = [123, '123', true, { name: 'jason' }, ['a'], () => {}]
justAnObject = () => {}
justAnObject = new Object()
justAnObject = new String('I\'m Jason')
justAnObject = new Number(123)
justAnObject = Object
justAnObject = Array

// 根據物件完整性測試：
let arrayObject = [123, '123', true, { name: 'jason' }, ['a'], () => {}]
let functionObject = () => {}
let objectObject = new Promise((res) => res({ customProp: 'hi' }))
let objectObject2 = new Promise<number>((res) => res(123))
let primitiveObject = new String('lorem')
let classItSelf = Object

arrayObject.customProp = 123
arrayObject[10] = { hi: '123' }
arrayObject[10] = { name: '123' }
arrayObject= []
arrayObject= [{ hi: '123' }]
arrayObject = [{ name: '123' }]
functionObject.customProp = 456
objectObject.customProp = 'Huh?'
objectObject2 = 456
objectObject2.customProp = 456
primitiveObject = 'hi'
primitiveObject = { name: 'hi' }
primitiveObject.customProp = 'hi'
classItSelf.customProp = 3.1415926

// 函式的的型別組成包括 input、output
// 以 Array.prototype.pop 為例：
// pop 方法沒有 input，但 output 可能是任意值，
// 但由於上述定義 arrayObject 時，TS 推論 arrayObject 裡面只能是 (string | number | boolean | string[] | { name: string })，這些型別
// 所以用 arrayObject.pop 時，TS 能推論 pop 方法 output 型別必須要是上述之一。

arrayObject.pop = () => 123
arrayObject.pop = () => ({ hi: '123' })
arrayObject.pop = () => { console.log('hi') }

// push 型別定義為 (...items: T[]): number;
let anotherArrayObject = [123, '456']
anotherArrayObject.push = (...items: boolean[]) => 0 // anotherArrayObject 並沒有 boolean 的 item
anotherArrayObject.push = (...items: number[]) => 0
anotherArrayObject.push = (...items: number[]) => '0' // Array.prototype.push 的 output 定義為 number (回傳 push 後該 item 的 index)


// 大部分的情況下，只要定義任何函式，TypeScript 通常會無條件推論函式內的參數（Parameters）為 any 型別，
// 這種現象我們稱之為 Implicit Any。
let addition = function (param1, param2) {
  return param1 + param2;
};
// 參數註記後，大部分的情況下 TS 都可以推論出 output 型別
let addition2 = function (param1: number, param2: string) {
  return param1 + param2;
};

// 遇到函式是回傳 any 型別的值，我們必須主動對該值作型別註記
// 例如 JSON.parse()
const aJSONString = '{"hello":"world","name":"jason"}'
let parseJSON = JSON.parse(aJSONString)
let parseJSON1 = JSON.parse(aJSONString) as { hello: string, name: string}
let parseJSON2 = <{ hello: string, name: string}>JSON.parse(aJSONString)
let parseJSON3: { hello: string, name: string} = JSON.parse(aJSONString)

// 根據廣義物件完整性，可以完全覆寫函式型別，只要格式正確
addition2 = (param1: number, param2: string) => param1 + param1 + param2
addition2 = (param1: number, param2: number) => param1 + param1 + param2
addition2 = (param1: number, param2: number) => { param1 + param1 + param2 }
addition2 = (param: number, param2: number) => param + param + param2

// 試著推論以下結果與是否會報錯
let doesItWork1 = () => undefined
let doesItWork2 = ():undefined => undefined
let doesItWork3 = ():undefined => {}
let doesItWork4 = ():void => undefined
let doesItWork5 = ():void => null

// 陣列型別會看定義時的的值，若型別同一樣則為同質性陣列 Homogeneous Type Array
// 若有多個型別則為異質性陣列 Heterogenous Type Array
let arraySample = [123, false]
let arraySample2 = ['st', 'in', '123']
arraySample[9] = 456
arraySample[9] = null
arraySample.push('123')
arraySample.concat('123')
arraySample = ['123']

// 試著比較 2,4 推論出的型別，其實等同於
// {
//   message: string,
//   revolt?: number
// }
let objectArray1 = [
  { message: '123' },
  { message: '456' },
  { message: '789' }
]
let objectArray2 = [
  { message: '123' },
  { message: '456', count: 123 },
  { message: '789' }
]
let objectArray3 = [
  { message: '123' },
  { message: 123 },
  { message: '789' }
]
let objectArray4 = [
  { message: '123' },
  { message: '456', count: 123 },
  { message: '789', count: undefined }
]

// 若直接宣告空陣列則會推論為 any
let emptyArray = []

// 若陣列內要允許可以空值
let emptyArray2: (number | null)[]
emptyArray2 = [123, null, 456]
emptyArray2 = ['123', null, 456]

// 陣列的型別推論與註記時機
// 大部分的狀態下，陣列型別的推論是符合開發者期待的
// 除非遇到以下狀況，才需要對儲存陣列型別的變數積極地作型別註記：
// 空陣列值必須積極註記，這是會了要革除 any 可能帶來的禍害
// 陣列裡的元素沒有你要求的型別，可以用 union 技巧作積極的型別註記
// 為了程式碼的可讀性，通常一個陣列擁有多個型別的話（也就是 Heterogenous Type Array），建議還是用 union 註記一下，不然要在陣列裡面用人眼遍歷過陣列的每一個值對應的每個型別 —— 跟直接註記比起來：型別註記是比較恰當的選擇喔

// 元組 Tuples
// 元組必須要進行註記行為
// let A: [T1, T2, T3, ..., Tn] = [V1, V2, V3, ..., Vn]
type Vehicle = [string, string, string, Date]
let BMWMotor: Vehicle = ['BMW', 'motocycle', 'silver', new Date(2019, 2, 17)]
let GIANTBike = <Vehicle>['GIANT', 'bike', 'blue', new Date(2009, 12, 27)]
let TOYOTACar = ['TOYOTA', 'car', 'green', new Date(2020, 5, 10)] as Vehicle

// 陣列與元組的差異
// 型別陣列裡，只要裡面的元素之型別為此陣列規定的範疇內（比如說 (number | string)[] 只能存取數字跟字串），
// 除了沒有限定元素的數量外，順序也不限定；
// 元組型別則是除了元素的個數必須固定外，格式必須完全吻合，
// 因此裡面元素型別的順序也是固定。
let v1: Vehicle = ['BMW', 'motocycle', 'silver'] // 少一個
let v2: Vehicle = ['BMW', 'motocycle', 'silver', new Date(2009, 12, 27), new Date(2009, 12, 27)] // 多一個
let v3: Vehicle = ['BMW', 'motocycle', 'silver', '2009, 12, 27'] // 型別錯
let v4: Vehicle = ['BMW', 'motocycle', new Date(2009, 12, 27), 'silver'] // 對應順序型別錯

// 型別化名 Type Alias
// 抽象化各種定義型別，給予變數後在函式內即可自動推論出參數型別而不需再註記
type MathOperator = (n1: number, n2: number) => number
let powerOP: MathOperator = function (n1, n2) {
  return n1 ** n2
}

type PersonInfo = {
  name: string,
  age: number,
  hasPet: boolean
}
function printInfo(info: PersonInfo) {
  console.log(info.name)
  console.log(info.age)
  console.log(info.hasPet)
}
printInfo({ // 明文形式沒有註記型別，直接帶入函式會不給過
  name: 'string',
  age: 123,
  hasPet: true,

  hello: 'world'
})
// 參數對於（未被註記的）變數檢測，是只要變數符合到參數對應之型別的格式就算通過，
// 如果有聽過一些程式上的技巧的話 -- 這算是 Duck-Typing 的模式
let personInfo1 = {
  name: 'string',
  age: 123,
  hasPet: true,

  hello: 'world'
}
printInfo(personInfo1) // 將物件存入變數後(自動產生明文型別)帶入函式會過

// 若將 undefined 作為物件某些屬性的型別，儘管 undefined 在原生 JS 的意味就是可以放置該屬性為空值，
// 甚至是不去定義的狀態。但在 TypeScript 的世界裡：undefined 這種原始型別代表必須存取名為 undefined 這種值，
// 並不是完全省略定義它！
type Gender = 'male' | 'female'
type AccountInfo = {
  account: string,
  password: string,
  nickname: string | undefined,
  birth: string | undefined,
  gender: Gender | undefined,
  subscribe: boolean
}
let accountJason: AccountInfo = {
  account: 'jason@gmail.com',
  password: '123456',
  subscribe: true
}

// 物件屬性上的選用註記
// type A = {
//   P?: T
// }
// 代表的意義是，被型別化名 A 作型別註記的變數，可以：
// 選擇性地忽略 P 這個屬性。
// 因為推論出來的結果會是以下的形式，因此也可以選擇寫出 P 屬性但填入 undefined 這個值：
// { P?: T | undefined }

let additionThreeAsDefault = function (num1: number, num2?: number) {
  if (num2) {
    return num1 + num2
  }
  return num1 + 3
}
let result = additionThreeAsDefault(1)
let result2 = additionThreeAsDefault(1, 55)

let additionAllNum = function (num1: number, ...nums: number[]) {
  return nums.reduce((result, num) => result + num, num1)
}
let result3 = additionThreeAsDefault(1)
let result4 = additionThreeAsDefault(1, 55)
let result5 = additionThreeAsDefault(1, 55, 566, 123) // todo

type VehicleInfoWithOptionalElements = [string, string, string?, Date?]
type VehicleInfoWithOptionalElements2 = [string, string, string?, Date] // 不能在選填參數後定義必填參數
let Vehicle1: VehicleInfoWithOptionalElements = ['hi', '123', '456']
let Vehicle2: VehicleInfoWithOptionalElements = ['hi', '123', '456', undefined]
let Vehicle3: VehicleInfoWithOptionalElements = ['hi', '123', '456', new Date()]

// never 型別的意義
// never 型別的概念是程序在函式或方法執行時：
// - 無法跳脫出該函式或方法
// - 出現例外結果中斷執行
let executesForever = function () { // () => never
  while(true) {
  }
}

// never 型別為所有型別的 Subtype
// 以下範例函式回傳值型別有可能是 : void | never
// 但由於 never 型別為所有型別的 Subtype，所以結果會等於 : void
let probablyExecutesForever = function (num: number) {
  while(num > 5) {
  }
  return num
}
const randomNumber = Math.random() * 10
probablyExecutesForever(randomNumber)
probablyExecutesForever(6)
probablyExecutesForever(4)

// 故任何型別與 never 聯集的結果都會剩下該型別而已
type T = void | never
type U = any | never

// 故任何型別與 never 交集的結果都會變 never
// never 的出現重點在於要讓函式或方法的回傳值之型別也必須涵蓋有可能會沒辦法跳脫或者甚至中斷執行的狀況。
type T2 = number & never
type U2 = Array<string> & never

// never 型別與變數指派行為
// - 若變數被註記為任意型別 T，變數除了可以被型別 T 的值指派外，也可以被指派屬於 never 型別的值
// - 若變數被註記為 never 型別，則變數不能指派任意型別 T （除了 never 型別以外）的值
let wontThrowError = () => 123
let acceptNever: never = wontThrowError()

// TypeScript 很明確要求，函式必須要具備 Unreachable Endpoint（沒辦法結束執行）才能確定回傳值為 never 型態
let possibleNotThrowError = (): never => {
  const possibility = Math.random()
  while (possibility > 0.5) {
    throw new Error('ERROR')
  }
}

// unknown 相對 any 來說，是一種更安全的型別機制(a type-safe counterpart)
// unknown 與 any 的共通點是：只要當變數被註記為 any 或 unknown，該變數照樣都可以接收任意型別的值。
let anyType: any
let unknownType: unknown
anyType = '123'
anyType = 123
anyType = true
anyType = { hi: 'hey' }
unknownType = '123'
unknownType = 123
unknownType = true
unknownType = { hi: 'hey' }

// unknown 型別的值不能被強行指派到 —— 除了 any 或 unknown 型別外 —— 的任意型別變數
let isNumberType: number
let isStringType: string
let isBooleanType: boolean
let isArrayType: (string | null)[]
let isAnyType: any
let isUnknown: unknown
isNumberType = anyType
isStringType = anyType
isBooleanType = anyType
isArrayType = anyType
isAnyType = anyType
isUnknown = anyType
isNumberType = unknownType
isStringType = unknownType
isBooleanType = unknownType
isArrayType = unknownType
isAnyType = unknownType
isUnknown = unknownType

// Type Guard 限制型別被推論到的可能性
// —— 來 Bypass unknown 型別原先的限制
// —— 不能被指派到被註記到的任意型別（除了 unknown 與 any）的變數
if (typeof unknownType === 'number') {
  isNumberType = unknownType
}
// 還有另一種方式可以將 unknown 型別的值指派到一般註記的變數裡，就是用顯性的型別註記。
isStringType = <string>unknownType
isArrayType = unknownType as Array<null>

// 被註記為 unknown 的變數什麼事情的不能做！
// 除非開發者對該變數進行顯性的型別註記亦或者根據程式碼的控制流程分析判斷說該變數的型別被限縮到某個範疇，
// 該變數才有機會做一些事情。（比如：呼叫屬性、方法等)
anyType.hello()
anyType.world = 'world'
anyType++
unknownType.hello()
unknownType.world = 'world'
unknownType++
if (typeof unknownType === 'number') {
  unknownType++
}

// unknown 運用場景：可以寫一個安全的函式（或方法）把不安全的函式（或方法）包裝起來。
// 比如說，把 JSON.parse 這種會回傳 any 的方法函式包裝起來。
const safelyParseJSON = (json: string): unknown => {
  return JSON.parse(json)
}
let JSONString = `{
  "message": "hi",
}`
let normalParseResult = JSON.parse(JSONString)
let safelyParseResult = safelyParseJSON(JSONString)
// 經過安全包裝後的 safelyParseResult 不能隨意使用
console.log(normalParseResult.message)
console.log(normalParseResult.hello)
console.log(safelyParseResult.message)
console.log(safelyParseResult.hello)
// safelyParseResult 經過進行顯性的型別註記亦或者根據程式碼的控制流程分析判斷說該變數的型別被限縮到某個範疇，
// 該變數才能使用
type JsonObject = {
  message: string
}
const safelyParseResult2 = safelyParseResult as JsonObject
console.log(safelyParseResult2.message)
console.log(safelyParseResult2.hello)

// unknown 跟任何型別交集其結果只會有該任何型別
// unknown 跟任何型別聯集其結果只會剩 unknown
let T0: unknown & number
let T1: unknown | number

// 由於 any 的自由程度大過於 unknown
// 故結果如下
let T2: unknown & any
let T3: unknown | any