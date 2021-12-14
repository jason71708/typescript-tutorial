enum Gender2 { Male, Female, Other }

interface UserInfo {
  // 原始型別
  id: number
  name: string

  // 廣義物件型別
  birth?: Date
  interests?: string[]
  
  // TypeScript Enum 或 Tuple 都可
  gender?: Gender2

  // 明文型別
  address?: {
    country: string
    city: string
  }

  // 函式型別
  logInfo?(message: string): void
}

// 單純只有函式的格式
interface UpdateRecord {
  (id: number, newRecord: UserInfo): void
}

// 仔細比對用 interface 的結果與使用 type 的結果，幾乎完全一樣。
function printUserInfo(info: UserInfo) {
  console.log(info.name)
  console.log(info.birth)
  console.log(info.gender)
}
printUserInfo({
  id: 123,
  name: 'string',
  gender: '???'
})

let userInfo1 = {
  id: 123,
  name: 'string',
  gender: '???'
}
printUserInfo(userInfo1)

printUserInfo({
  id: 123,
  name: 'string',
  otherKey: '???'
})

let userInfo2 = {
  id: 123,
  name: 'string',
  otherKey: '???'
}
printUserInfo(userInfo2)

// Interface Extend
interface AccountSystem {
  email: string
  password: string
  subscribed: boolean
}
interface AccountProfile {
  nickname?: string
  birth?: Date
  gender?: Gender2
}
interface UserAccount extends AccountSystem, AccountProfile {}

// 若我們有一系列 TypeScript 介面 I1, I2 ... In，其中：所有的介面裡，不同的介面卻互相有重複的屬性名稱 —— 這種情形是可以接受的；
// 然而，名稱相同之屬性，各自對應之型別不能互相衝突。
// 若滿足以上條件，並且宣告介面 IMain 為 I1, I2 ... In 的擴展：
// interface IMain extends I1, I2, ... In {}
// 則 IMain 為所有 I1, I2, ... In 交集的結果。

// 介面 Interface V.S. 型別 Type
// 從剛剛我們得出的結論：介面可以進行延伸或擴展（Interface Extension），這裡就可以開始點出介面跟型別系統的主要差別。
// 介面（Interface）的意義 —— 跟規格的概念很像，可以擴充設計、組裝出更複雜的功能規格
// 型別（Type）的意義 —— 代表靜態的資料型態，因此型別一但被定義出來則恆為固定的狀態。儘管可以利用型態的複合（intersection 與 union）看似達到型別擴展的感覺，然而這個行為並不叫作型別擴展，而是創造出新的靜態型別
// - 介面：規格（Spec）的概念，可以組裝、延展（使用 extends）
// - 型別：靜態的資料格式，不能被延展，每一次宣告新的型別化名 —— 對型別進行複合形式的操作 —— 都是在定義新的型別，不是延展作用

// 介面定義的屬性對應的函式可以進行超載的動作。
// 被超載的函式名稱必須相同。（型別格式也可以相同，但沒有意義，就很像多出來冗贅的程式碼）
// 單純函式形式的介面也可以進行函式超載，差別在沒有名稱標記而已。
// 若某物件實踐該介面時，必須符合該介面裡 —— 超載過的函式之所有情形。
interface AddOperation {
  addition(p1: number, p2: number): number
  addition(p1: string, p2: string): number
}
// 詳見：https://ithelp.ithome.com.tw/articles/10216153

// Declaration Merging (Interface Merging)
// 介面重複定義狀態下，介面的名稱必須重複：
// 可用於拆分複雜的介面
interface MyDocument {
  // block-level elements
  createElement(tagName: 'p'): HTMLParagraphElement;
  createElement(tagName: 'body'): HTMLBodyElement;
}
interface MyDocument {
  // inline-level elements
  createElement(tagName: 'a'): HTMLAnchorElement;
  createElement(tagName: 'input'): HTMLInputElement;
}

// 介面融合的應用情境
// 第三方套件、使用 namespace
namespace ThirdPartyPlugin {
  interface StupidRequest {
    headers: Headers[]
    body: Body
    url: string
    mehtod: 'GET' | 'POST' | 'DELETE' // ....
  }
}
type Dictionary = { [propName: string]: string }
namespace OurPlugin {
  interface StupidRequest {
    query?: Dictionary
  }
}

// Indexable Types
type IndexableTypes = {
  [key: number]: string
}
let normal: IndexableTypes = {
  id: 13, // 允許新增 key value， value 必須為上面定義的型別
  name: '123', // ??? 奇怪的是 type 定義的 key 型別不會檢查
  123: '456'
}
let empty: IndexableTypes = {} // 可允許空的
type IndexableTypes1 = {
  [prop: string]: string | number,
  [prop: number]: boolean // 不能違反第一個 Indexable Types 所設定的"值"型別
}
type IndexableTypes2 = {
  [prop: string]: string | number,
  [prop: number]: number
}
type IndexableTypes3 = {
  name: string,
  birth: Date, // 其他定義的型別規則必須符合 Indexable Types 所設定的"值"型別
  [prop: string]: string;
}
interface StringTypeList {
  [index: string]: string
}
let empty2: StringTypeList = {} // 可允許空的
let stringTypeList: StringTypeList = {
  123: '123', // ??? 奇怪的是 interface 定義 key 型別為 string 時會 allow 數字與字串的 key
  index: '456'
}
interface StringTypeList2 {
  [index: number]: string
}
let stringTypeList2: StringTypeList2 = {
  123: '123',
  [0]: '123',
  index: '456' // interface 定義 key 型別為 number 時就會檢查 key 的型別
}
let stringTypeArrayLiteral: StringTypeList2 = ['1', '2', 3] // ??? 與文章講的不一樣，現在可以直接定義成陣列
let emptyStringTypeArrayLiteral: StringTypeList2 = []

// Readonly Property
type TReadonlyProperty = {
  readonly name: string,
  age: number
}
interface IReadonlyProperty {
  readonly name: string
  age: number
}
let sampleType: TReadonlyProperty = {
  name: 'jason',
  age: 20
}
sampleType.name = 'other'

// 介面的混合型態（Hybrid Type Interface
// 文章提到：雷點太多故僅介紹一下
interface Counter {
  // 純函式
  (start: number): void

  // 也可物件定義
  increment(): number
  reset(): void
  value: number
}
// 實作 Counter 時，若少了 increment，TS 不會提醒......


