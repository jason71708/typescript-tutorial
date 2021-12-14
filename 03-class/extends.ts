
// 類別的繼承 Class Inheritance
// 必須用 extends 語法
// class D extends c {}
// D 類別可以使用 C 類別非 private 模式的成員變數與方法們（D 除了 Pprivate 與 Mprivate 外，其他成員都可以使用）
// D 類別建造出來的物件（使用 new），該物件的型別除了屬於 D 類別以外 —— 由於繼承的關係，該物件的型別也同時屬於類別 C
// 相對地，C 類別所建造出來的物件型別為 C 類別，但不屬於 D 類別
// 使用 protected 關鍵字來保護變數與方法不被外部使用又可讓繼承的類別使用
class Monster {
  constructor(
    protected hp: number,
    private name: string,
    private type: string,
    protected power: number,
    public tag?: string
  ) {}

  public attack() {
    // ...
  }
}
// 我們可以在子類別裡的建構子函式內，使用 super，並且將 super 看成父類別的建構子函式
// 運用 super 來呼叫父類別的建構子函式時，必須按照父類別建構子函式的型別，填入正確順序的參數。
class DefenceMonster extends Monster {
  constructor(
    private defence: number,
    hp: number,
    name: string,
    power: number,
    tag?: string
  ) {
    // this.defence // 子類別的建構子函式裡，進行初始化物件時 —— 也就是 super 被呼叫之前，由於物件還未建立完畢，不能有 this 相關的操作行為
    super(hp, name, 'Defence', power, tag)
  }
}
const ddd = new DefenceMonster(1.5, 100, 'ddd', 50)
ddd.attack()
ddd.name
ddd.tag
// 就算你不對子類別自訂建構子函式，子類別會直接延用父類別建構子函式的規格，要求使用者必須代入建立物件時所需具備的參數！
class NormalMonster extends Monster {}
const nnn = new NormalMonster(50, 'nnn', 'Normal', 10)