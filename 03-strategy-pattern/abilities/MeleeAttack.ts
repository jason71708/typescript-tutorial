import Character from '../characters/Character'
import Attack from './Attack'

export default class MeleeAttack implements Attack {
  public attack(self: Character, target: Character) {
    console.log(`${self.name} strikes ${target.name}!`)
  }
}