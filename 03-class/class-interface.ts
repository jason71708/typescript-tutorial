enum Role {
  Swordsman = 'Swordsman',
  Warlock = 'Warlock',
  Highwayman = 'Highwayman',
  BountyHunter = 'Bounty Hunter'
}
interface ICharacter {
  name: string
  role: Role
  attack(targer: ICharacter): void
}
// 類別繼承與介面綁定最大的不同 Class Inheritance V.S. Interface Implementation:
// 一個子類別一次只能繼承一個父類別；然而，一個類別可以跟多個介面進行綁定。
// 使用類別繼承的耦合程度一定會比介面的綁定還來得高。
interface IStats {
  health: number
  mana: number
  strength: number
  defense: number
}
class defaultCharacter {
  constructor(
    public name: string
  ) { }

  public walk(position: number) {
    console.log(`Walk to ${position} point`)
  }
}
// 繼承跟介面的綁定也可以同時進行
class Character extends defaultCharacter implements ICharacter, IStats {
  constructor(
    public name: string,
    public role: Role,
    public health: number = 100,
    public mana: number = 100,
    public strength: number = 50,
    public defense: number = 20,
  ) {
    super(name)
  }

  public normalPower() {
    this.health += 20
  }

  public attack(target: ICharacter) {
    let verb: string

    switch (this.role) {
      case Role.Swordsman: verb = 'attacking'
        break
      case Role.Warlock: verb = 'cursing'
        break
      case Role.Highwayman: verb = 'ambushing'
        break
      case Role.BountyHunter: verb = 'threatening'
        break
      default: throw new Error(`${this.role} didn't exist!`)
    }

    console.log(`${this.name} is ${verb} on ${target.name}`)
  }
}
// 若變數被註記到類別有實踐過的介面，該類別建構的物件可以被指派到該變數去。
let character: IStats = new Character('Maxwell', Role.Swordsman)

// 類別綁定介面的推論與註記機制:
// - 任何類別 C —— 儘管有綁定介面 I1、I2、... In，建構出來的物件之型別推論結果一律都是指向該類別 C。
// - 若變數被積極註記為 I1、I2、... In 中的任一介面 —— 該變數依然可以被指派類別 C 建構出來的物件。主要原因是 —— 被註記為介面型別的變數，只要該物件至少符合介面的實作，就算通過。
// 變數被推論為類別 C 或者是被積極註記為介面型別 I1、I2、... In 的差別在於:
// - 如果變數被推論亦或者註記為 C，則變數除了可以呼叫類別裡自定義的 public 成員外，也可以呼叫介面 I1、I2、... In 融合過後的規格之屬性與方法。
// - 如果變數被註記為 I1、I2、... In 介面裡其中一個介面 Im，儘管變數可以被指派有實踐介面 Im 類別建構出來的物件，卻只能呼叫 Im 介面裡面的規格之屬性與方法。
class BestWarlock extends defaultCharacter implements ICharacter, IStats {
  constructor(
    public name: string,
    public role: Role = Role.Warlock,
    public health: number = 1000,
    public mana: number = 2000,
    public strength: number = 500,
    public defense: number = 500,
  ) {
    super(name)
  }

  public specialPower() {
    this.mana = this.mana * 2
  }

  public attack(target: ICharacter) {
    console.log(`${this.name} is double cursing on ${target.name}!!!`)
  }
}
let character2 = new Character('Maxwell', Role.Swordsman)
character2 = new BestWarlock('Jason')
// 積極註記介面型別的好處:
// 任何被註記為介面 I 的變數 A 或函式的參數 P，只要有類別實踐過介面 I，該類別建構出來的物件可以被代入到變數 A 或函式裡的參數 P
// 但如果呼叫非該註記介面的方法或屬性時則會報錯
let character3: ICharacter = new Character('Maxwell', Role.Swordsman)
character3 = new BestWarlock('Jason')
character3.specialPower()

// 繼承後的子類別同時綁定介面後的型別推論與註記機制
class BountyHunter extends Character {
  public hostages: ICharacter[] = []

  constructor(name: string) {
    super(name, Role.BountyHunter)
  }

  public capture(target: ICharacter, successRate: number) {
    const randomNumber = Math.random()
    if (randomNumber > (1 - successRate)) {
      this.hostages = [...this.hostages, target]
    }
  }
}
const bountyHunter = new BountyHunter('Alex')
// 子類別繼承父類別，除了擁有父類別 public 與 protected 模式的成員外，也同時繼承父類別實踐之介面的性質
// attack 方法需要 ICharacter 型別的參數，bountyHunter 可以成為參數
character3.attack(bountyHunter)

interface Eat {
  digestiveSpeed: number
  eat: (food: string) => void
  drink: () => void
}

class Man implements Eat {
  constructor(public name: string) { }
  eat() { // 實作界面方法，若介面方法有定義參數型別，則可接受參數為 undefined
  }
  drink(beverage: string) { // 但若介面方法沒有定義參數型別，則實作界面方法時需要兼容 undefined
  }
}

class OldMan extends Man {
  constructor(name: string) {
    super(name)
  }
  eat(food: string | number | null) { // 同上，需要兼容 Man 定義的 eat: () => void
  }
}

// 原則上還是遵照介面定義的規格實作，避免在實作 class 與其衍生 class 時擴增參數型別。