import Character from '../characters/Character'
import Attack from './Attack'
import WeaponType from '../weapons/Types'
import Weapon from '../weapons/Weapon'

export default class MeleeAttack implements Attack {
  public readonly availableWeapons = [
    WeaponType.Sword
  ]
  public attack(self: Character, target: Character, weapon: Weapon) {
    console.log(`${self.name} strikes ${target.name} with ${weapon.name}!`)
  }
}