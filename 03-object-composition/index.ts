// Object Composition（物件複合）
// Favour Object Composition Over Class Inheritance.

// 錯誤實踐
const canFight = state => ({
  fight: () => {
    console.log(`${state.name} slashes at foe!`)
    state.stamina--
  }
})

const canCast = state => ({
  cast: (spell: string) => {
    console.log(`${state.name} casts ${spell}!`)
    state.mana--
  }
})

const fighter = (name: string) => {
  let state = {
    name,
    health: 100,
    stamina: 100
  }
  return Object.assign(state, canFight(state))
}

const mage = (name: string) => {
  let state = {
    name,
    health: 100,
    mana: 100
  }
  return Object.assign(state, canCast(state)) 
}

let scorcher = mage('Scorcher')
scorcher.cast('fireball')
console.log(scorcher.mana)

let slasher = fighter('Slasher')
slasher.fight()
console.log(slasher.stamina)

// 物件的委任 Delegation
// 委任的概念跟策略模式篇章採取的作風很像。
// 但更精確的說法是：策略模式在進行策略替換時的那個參考點，該參考點連結到的不同之策略 —— 那些策略就是被委任的物件。
// 物件委任（也就是物件複合的根本）的概念本身就可以作為策略模式的基礎

// 錯誤實踐解法:
// - 抽出共用邏輯
// - 指定參考點連結到不同之處
interface CharacterStat { health: number }

class FighterCharacterStat implements CharacterStat {
  constructor(
    public health: number,
    public stamina: number
  ) {}
}

class MageCharacterStat implements CharacterStat {
  constructor(
    public health: number,
    public mana: number
  ) {}
}

interface Attack {
  attack(self: Character, target: Character): void
}

class DirectAttack implements Attack {
  attack(self: Character, target: Character) {
    if (self instanceof Fighter) {
      self.characterStatRef.stamina --
      console.log(`${self.name} swings a sword to ${target.name}`)
    } else throw new Error('Character is not fighter!')
  }
}

class CastingAttack implements Attack {
  attack(self: Character, target: Character) {
    if (self instanceof Mage) {
      self.characterStatRef.mana --
      console.log(`${self.name} casts a fireball to ${target.name}`)
    } else throw new Error('Character is not Mage!')
  }
}

class Character {
  constructor(
    public name: string,
    public characterStatRef: CharacterStat,
    private attackRef: Attack
  ) {}

  public attack(target: Character) {
    this.attackRef.attack(this, target)
  }
}

class Fighter extends Character {
  constructor(
    public name: string,
    public characterStatRef = new FighterCharacterStat(100, 100)
  ) {
    super(
      name,
      characterStatRef,
      new DirectAttack()
    )
  }
}
class Mage extends Character {
  constructor(
    public name: string,
    public characterStatRef = new MageCharacterStat(100, 100)
  ) {
    super(
      name,
      characterStatRef,
      new CastingAttack()
    )
  }
}

export default {Fighter, Mage}

// 錯誤範例問題點：
// - 遇到衝突無法解決 —— 使用 Object.assign 進行繼承物件的狀態
// 假設有多個攻擊可以裝備，各個攻擊底下都是同樣的 methods，使用 Object.assign，前面的會被蓋掉
let canFight2 = (state) => ({
  attack() { /* ... */ }
})

let canStab = (state) => ({
  attack() { /* ... */ }
})

function Fighter2(name) {
  let state = { /* 略... */ }

  return Object.assign(state, canFight2(state), canStab(state))
}
// 正確版本的 Object Composition —— 就算你沒有用類別，也可以利用策略模式實踐出不同的攻擊策略！
let fightAttackStrategy = {
  attack(self, target) {
    console.log(`${self.name} swings a sword to ${target.name}`)
    self.stamina--
  }
}
let stabAttackStrategy = {
  attack(self, target) {
    console.log(`${self.name} stabs toward ${target.name}`)
    self.mana--
  }
}
function Fighter(name, attackStrategy) { // 使用策略模式
  let state = {
    name,
    health: 100,
    stamina: 100,

    _attackStrategy: attackStrategy, // 底線開頭代表不希望外面的人使用

    switchAttackStrategy(type) { // 更換不同攻擊策略
      this._attackStrategy = type
    }

    attack(target) { // 攻擊行為委任給 _attackStrategy
      this._attackStrategy.attack(this, target)
    }
  }

  return state
}

// Favour Object Composition Over Class Inheritance:
// Object Composition 的觀念是藉由物件的委任（Delegation）進行物件與物件間的連結。
// 主要的物件若需要執行特定的功能，可以將執行的步驟遞給委任的物件代理執行。
// Object Composition 的優勢大過於類別繼承的原因主要有：
// - 彈性較高，關係是建立在抽象的基礎之上，而非實體繼承
// - 隨時可以替換同質性的委任物件，只要委任物件都遵守同一個介面的規格
// - 委任的物件可以被重複使用 —— 任何其他主要物件需要委任物件的功能，只要開出一個參考點連結到委任物件，並且將功能傳遞給委任物件就好了
// - 大部分的設計模式都是基於 Object Composition 進行延伸
// - 委任物件的模式就是讀者可能聽過的 Dependency Injection （依賴注入） 的實踐，可以避免物件與物件間的相依性過高造成難以功能分離與重複使用的狀況