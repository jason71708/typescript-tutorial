import Role from './Role'
import Character from './Character'
import defaultEquipmentFactory from '../equipments/DefaultEquipmentFactory'
import WeaponTypes from '../weapons/Types'
import ArmourTypes from '../armours/Types'

export default class Warlock extends Character {
  constructor(name: string) {
    super(
      name,
      Role.Warlock,
      defaultEquipmentFactory.createWeapon(WeaponTypes.Wand),
      defaultEquipmentFactory.createArmour(ArmourTypes.Robe)
    )
  }
}