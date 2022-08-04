// 在 TS 中定義 class
class CustomPersonInfo {
  name: string
  age: number
  hasPet: boolean
  otherFuc: (p1: string) => boolean

  constructor(name: string, age: number, hasPet: boolean) {
    this.name = name
    this.age = age
    this.hasPet = hasPet
    this.otherFuc = p1 => !p1
  }

  printInfo() {
    console.log(this.name, this.age, this.hasPet)
  }
}

// 範例：定義帳戶型別與帳戶系統與交易界面
type TUserAccount = {
  account: string
  password: string
  money: string
}
interface AccountSystem {
  users: TUserAccount[];
  currentUser: TUserAccount | undefined
  signIn(account: string, password: string): void
  signOut(): void
}
interface TransactionSystem {
  deposit(amount: number): void
  withdraw(amount: number): void
}
interface ICashMachine extends TransactionSystem, AccountSystem { }
// 類別如果要根據某介面的規格實踐出來的話，可以使用 implements 關鍵字：
class CashMachine implements ICashMachine {
  // ...
}

// 存取修飾子 Access Modifiers
// 存取修飾子總共分為三種模式：public、private 以及 protected
// 存取修飾子可以調整成員變數（Member Variables）與方法（Member Methods）在類別裡面與類別外部的使用限制。
// 類別在宣告時，若成員變數或方法沒有被註記上存取修飾子，預設就是 public 模式。
// 若宣告某類別 C，則裡面的成員變數 P 或成員方法 M 被註記為：
// public 模式時：P 與 M 可以任意在類別內外以及繼承 C 的子類別使用
// private 模式時：P 與 M 僅僅只能在當前類別 C 內部使用
// protected 模式時： P 與 M 除了當前類別 C 內部使用外，繼承 C 的子類別也可以使用
// 若宣告某類別 C，其中該類別有明確實踐（implements）某介面 I，則類別 C 必須實踐所有介面 I 所提供的格式 —— 而介面 I 的規格轉換成為類別 C 時 —— 成員變數與方法皆必須為 public 模式
// 補充：interface 如果有定義包含 private 屬性的東西事實上是不合理的！
interface AccountSystem2 { // 所以在介面中把私有屬性移除
  signIn(account: string, password: string): void
  signOut(): void
}
interface ICashMachine2 extends TransactionSystem, AccountSystem2 { }

// 建構子函式裡的參數直接宣告成員變數
// 若某類別 C 的宣告裡，P1、P2、...、Pn 為其成員變數 —— 每個成員變數對應型別（或介面）分別為 T1、T2、...、Tn。
// 其中，P1 到 Pn 的存取模式可為任意修飾子（public、private 以及 protected），則我們可以直接在 C 的建構子函式的參數內進行成員變數的宣告：
class CashMachine2 implements ICashMachine2 {
  private users: TUserAccount[]

  constructor(users: TUserAccount[]) {
    this.users = users
  }
  // ...
}
// 可以直接換下面寫法更簡潔
class CashMachine3 implements ICashMachine2 {
  constructor(private users: TUserAccount[]) { }
  // ...
}
// 補充：在建構子的參數裡，想要宣告 public 模式的成員變數，你必須明確註記 public 這個修飾子出來，不然 TypeScript 只能當該參數為普通參數而不是該類別的成員變數。
class CashMachine4 implements ICashMachine2 {
  constructor(public users: TUserAccount[]) { }
  // ...
}

class CircleGeometry {
  private PI: number = 3.14
  // class 成員變數可混用直接定義與建構子定義，此範例class會有兩個成員變數
  constructor(private radius: number) { }

  public area(): number {
    return this.PI * (this.radius ** 2)
  }

  public circumference(): number {
    return 2 * this.PI * this.radius
  }
}
const myCircle = new CircleGeometry(5)
myCircle.area()

// 類別的靜態屬性與方法：
// 不需要經由建構物件的過程，而是直接從類別本身提供的屬性與方法，皆稱之為靜態屬性與方法，又被稱為靜態成員（Static Members）。
class StaticCircleGeometry {
  static PI: number = 3.14

  static area(radius: number): number {
    return this.PI * (radius ** 2)
  }

  static circumference(radius: number): number {
    return 2 * this.PI * radius
  }
}
StaticCircleGeometry.area(5)

// static 與存取修飾子 Access Modifiers：
// 類別的靜態成員可以被設定不同的存取模式 —— 包含 public、private 以及 protected 模式。
// 其運作的方式跟普通成員變數與方法的流程一模一樣；
// 差別就在於 —— 普通成員是綁定在建構過後的物件上，而靜態成員則是跟類別本身綁定。
class StaticCircleGeometry2 {
  protected static PI: number = 3.14

  static area(radius: number): number {
    return this.PI * (radius ** 2)
  }

  static circumference(radius: number): number {
    return 2 * this.PI * radius
  }
}
StaticCircleGeometry2.PI

class OtherGeometry extends StaticCircleGeometry2 {
  public testFn() {
    console.log(StaticCircleGeometry2.PI) // 繼承後依舊能存取到父類別的 protected or public 靜態屬性與方法
  }
}

// 用 get 關鍵字搭配想要取的名稱
// 單純只有定義取值方法（Getter Method），它本身就是唯讀的狀態。
class CircleGeometryV2 {
  private PI: number = 3.14

  constructor(private radius: number) { }

  get area(): number {
    return this.PI * (this.radius ** 2)
  }

  // Getter Method 沒有回傳任何值是錯誤的行為
  // Getter Method 不能傳入參數使用
  get area2(params: number) {
    this.PI * (this.radius ** 2)
  }

  protected get circumference(): number {
    return 2 * this.PI * this.radius
  }
}
const myCircle2 = new CircleGeometryV2(15)
console.log(myCircle2.area)
console.log(myCircle2.circumference) // 取值方法（Getter Method）也能加上存取修飾子 Access Modifiers (public、private 以及 protected)
myCircle2.area = () => { }

// 定義一個存值方法 Setter Method 則是用 set 關鍵字
// 因為存值方法專門在模擬屬性被指派值的情況，因此會需要一個參數去代表被指派的值，所以存值方法的型別會多一個參數
class CircleGeometryV3 {
  private PI: number = 3.14

  constructor(public radius: number) { }

  get area(): number {
    return this.PI * (this.radius ** 2)
  }

  set area(value: number) {
    this.radius = (value / this.PI) ** 0.5
  }

  // 只能有一個參數：因為是模擬指派任何值到屬性的方式進行物件的存值，而指派任何值只會被當成一個參數
  set area2(value: number, value2: number) {
    this.radius = (value / this.PI) ** 0.5
  }
}
const myCircle3 = new CircleGeometryV3(2)
myCircle3.area = 3.14 * (5 ** 2)
console.log(myCircle3.radius) // 半徑應該等於 5

// readonly 也可以在 class 內做使用
class StaticClass {
  public static readonly id = 'hi'
}
StaticClass.id = 'hey'

// 私有建構子的應用 Private Constructor：
class PrivateConstructor {
  private constructor(name: string) { }
}
const test = new PrivateConstructor('hi') // 私有建構子不能直接在外面建立

// 單例模式 Singleton Pattern
// 若某類別 SingletonC 實踐單例模式，則必須符合：
// - SingletonC 的建構子函式為 private 模式
// - SingletonC 必須要有私有靜態屬性專門存放單例模式下的唯一物件（該物件又被稱為 Singleton，或單子），習慣上該靜態屬性的名稱為 Instance
// - SingletonC 必須要有公用靜態方法負責把單子回傳出來，是唯一一個取得單子的途徑，習慣上該靜態方法的名稱為 getInstance
class SingletonPerson {
  private constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean
  ) { }

  private static Instance: SingletonPerson = new SingletonPerson('Jason', 16, true)

  static getInstance(): SingletonPerson { return this.Instance }
}
// 單例模式的意義與注意事項:
// - 確保某物件（單子）在任何地方的單一性，並且針對該物件提供統一的成員方法。
// - 在多執行緒下的環境，必須確保單例模式下的類別，不會因為兩個執行緒以上同時讀到類別裡 —— 建構物件的表達式而違反單例模式的初衷。
// 另外，對單例模式的類別進行繼承的動作，並不違反單例模式的初衷。在單例模式下運用繼承的目的有二：
// - 子類別可以擴充該個體的功能（可能擴充靜態方法等
// - 多個子類別的單例物件可以在程式中隨時抽換
// 最後，建議不要將單例模式的建構子函式設定成 protected 模式，因為這並不是設計模式原著主張的東西，而是網路偏方。
const instance = SingletonPerson.getInstance()
console.log(instance)
console.log(instance.name)
// 在任何語言 —— 尤其是多執行緒（Multithreaded）的環境下，有可能會出現同時有多個執行緒呼叫到 new SingletonInstance，因此產生了兩個以上的單子 —— 這是不合理的行為，
// 所以如果讀者轉換到其他語言，想要實踐單例模式，必須注意有沒有發生的可能性（大部分都會，現在幾乎都是多執行緒的環境了）。
// 從 NodeJS 來看，儘管 Node 本身是多執行緒（還要顧慮一些 I/O 等事情），但執行 JavaScript 的程式碼過程本身是單執行緒，
// 而這也是因為當初 Google 開發 V8 引擎時的限制，不是 NodeJS 本身的問題喔。

// 懶漢模式 Lazy Initialization in Singleton Pattern:
// 第一次呼叫到 SingletonClass.getInstance 這個靜態方法時，到時候再建造就好了，於是就出現了以下的程式碼。
class LazySingletonPerson {
  private constructor(
    public readonly name: string,
    public readonly age: number,
    public readonly hasPet: boolean
  ) { }

  private static Instance: LazySingletonPerson | null = null

  static getInstance(): LazySingletonPerson {
    if (this.Instance === null) {
      this.Instance = new LazySingletonPerson('Jason', 16, true)
    }
    return this.Instance
  }
}

// 類別的型別推論 Type Inference in Class
enum Color { White, Black, Brown, Rainbow }
class Horse {
  constructor(
    public name: string,
    public color: Color,
    public readonly type: string,
  ) { }

  public info() {
    console.log(this.infoText())
  }

  public infoText() {
    return `It is ${this.name} the ${this.color} ${this.type}.`
  }
}
let aRondomHorse = new Horse('Max', Color.Black, 'Pony')
aRondomHorse.name = 'Max2'
aRondomHorse.color = 'Red'
aRondomHorse.type = '123'
aRondomHorse.noise = '123'
aRondomHorse = null
aRondomHorse = new Horse('Mark', Color.Brown, 'Stallion')
aRondomHorse = new Date()

// 若兩個 class 內的屬性與方法型別都一樣，且都為 public 的話，則會有可以覆寫的情況，
// 反之，若 class 內有 private 或 protected 的屬性或方法的話，則會不能覆寫
class FackHorse {
  constructor(
    public name: string,
    public color: Color,
    public readonly type: string,
  ) { }

  public info() {
    console.log('FackHorse')
  }

  public infoText() {
    return `It is sheep.`
  }
}
// 若宣告兩個類別 C1 與 C2 —— 其中 C1 與 C2 的成員皆為 public 模式，
// 並且所有的成員名稱對應型別皆相同，TypeScript 判定 C1 型別等效於 C2 型別。
aRondomHorse = new FackHorse('Mark', Color.Brown, 'Stallion')

// 類別的型別註記 Type Annotation of Class
let anotherHorse: Horse = new Horse('Jax', Color.White, 'Pony')
anotherHorse = <Horse>new Horse('Jax', Color.White, 'Pony')
anotherHorse = new Horse('Jax', Color.White, 'Pony') as Horse

// 不鼓勵類別與型別 type 結合的原因還是一句話："型別代表的意義是靜態資料格式，類別是針對物件的設計而有動態的行為"
class SomeClass implements TUserAccount {
  /* ... 略 */
}

// 繼承過後的類別之型別推論與註記 Type Inference & Annotation of Inherited Class
class Cat {
  constructor(
    public name: string,
    public color: Color,
    public readonly noise: string
  ) { }

  protected infoText() {
    return `It is a ${this.color} cat, named ${this.name}.`
  }
}

class UnicornCat extends Cat {
  constructor(name: string) {
    super(
      name,
      Color.Rainbow,
      'Nheeeeeeeheeeeheeeeheeee~~~'
    )
  }

  protected infoText() {
    return `It is a Unicorn Cat named ${this.name}`
  }

  public puke() {
    console.log('Puking rainbow vomit!')
  }
}
// 被註記為父類別的變數可以指派子類別的物件 —— 在原生 JS 裡的詮釋下 —— 它們隸屬於同一個原型鍊（Prototype Chain）下的產物。
let cat: Cat = new UnicornCat('Candy')
// 因為 TypeScript 參考的是 Cat 類別而不是 UnicornCat 類別的成員，因此才會被 TS 警告
cat.puke()

// `this` 在 class 與外部的狀況
class Box {
  content: string = 'box'
  getContent() {
    return this.content
  }
}

const box = new Box();
const otherBox = {
  content: "otherBox",
  getContent: box.getContent,
};

// Prints "ootherBoxbj", not "box"
console.log(otherBox.getContent());

// 用箭頭函式可以將當前作用域的 this 保留下來
class Box2 {
  content: string = 'box2'
  getContent = () => {
    return this.content
  }
}

const box2 = new Box2();
const otherBox2 = {
  content: "otherBox2",
  getContent: box2.getContent,
};

// Prints "box2"
console.log(otherBox2.getContent());

// 或是在方法函式用 `this` 參數綁定型別
class Box3 {
  content: string = 'box3';

  text: string = '';

  getContent(this: Box3) {
    return this.content;
  }
}

const box3 = new Box3();
const g = box3.getContent;
g();
// 在之後有任何物件調用此方法時，若該物件的成員們跟 `this` 綁定型別的成員不一致，將會報錯
const otherBox3 = {
  content: 'otherBox3',
  getContent: box3.getContent,
};

const otherBox4 = {
  content: 'otherBox4',
  text: 'text',
  getContent: box3.getContent,
}

console.log(otherBox3.getContent());
// Prints "otherBox4"
console.log(otherBox4.getContent());
// 加 `this` 參數僅能用於 TS 幫忙檢查型別，編譯後的 JS 行為依然會用當前調用該方法的物件當作 this