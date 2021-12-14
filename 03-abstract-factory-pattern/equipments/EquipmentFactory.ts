import Weapon from '../weapons/Weapon'
import Armour from '../armours/Armour'
import WeaponTypes from '../weapons/Types'
import ArmourTypes from '../armours/Types'

export default interface EquipmentFactory {
  createWeapon(type: WeaponTypes): Weapon
  createArmour(type: ArmourTypes): Armour
}