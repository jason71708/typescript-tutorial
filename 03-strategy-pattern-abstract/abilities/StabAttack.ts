import Character from '../characters/Character'
import Attack from './Attack'
import Weapon from '../weapons/Weapon'

export default class StabAttack implements Attack {
  public readonly availableWeapons = []

  public attack(self: Character, target: Character, weapon: Weapon) {
    console.log(`${self.name} stabs through ${target.name} with ${weapon.name}!`)
  }
}