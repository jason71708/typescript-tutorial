import Character from '../characters/Character'
import Attack from './Attack'
import WeaponType from '../weapons/Types'
import Weapon from '../weapons/Weapon'

export default class MagicAttack implements Attack {
  public readonly availableWeapons = [
    WeaponType.Wand
  ]
  public attack(self: Character, target: Character, weapon: Weapon) {
    console.log(`${self.name} costs magic and pierced through ${target.name} with ${weapon.name}!`)
  }
}