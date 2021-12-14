import Role from './Role'
import Character from './Character'
import defaultEquipmentFactory from '../equipments/DefaultEquipmentFactory'
import WeaponTypes from '../weapons/Types'
import ArmourTypes from '../armours/Types'

export default class Swordsman extends Character {
  constructor(name: string) {
    super(
      name,
      Role.Swordsman,
      defaultEquipmentFactory.createWeapon(WeaponTypes.Sword),
      defaultEquipmentFactory.createArmour(ArmourTypes.Armour)
    )
  }
}