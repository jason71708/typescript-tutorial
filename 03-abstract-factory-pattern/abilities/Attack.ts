import Character from '../characters/Character'
import WeaponType from '../weapons/Types'
import Weapon from '../weapons/Weapon'

export default interface Attack {
  availableWeapons: WeaponType[]

  attack(self: Character, target: Character, weapon: Weapon): void
}