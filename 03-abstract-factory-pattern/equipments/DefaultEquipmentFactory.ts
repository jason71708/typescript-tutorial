import EquipmentFactory from './EquipmentFactory'
import WeaponFactory from '../weapons/WeaponFactory'
import Role from '../characters/Role'
import WeaponTypes from '../weapons/Types'
import ArmourTypes from '../armours/Types'

import BasicArmour from '../armours/BasicArmour'
import BasicRobe from '../armours/BasicRobe'

const weaponFactory = new WeaponFactory

// 其中 Weapon 用延續上個 strategy-pattern-abstract 中實作的工廠創建
// Armour 沒有使用工廠
class DefaultEquipmentFactory implements EquipmentFactory {
  public createWeapon(type: WeaponTypes) {
    return weaponFactory.createWeapon(WeaponTypes[type])
  }

  public createArmour(type: ArmourTypes) {
    switch (type) {
      case ArmourTypes.Armour: return new BasicArmour()
      case ArmourTypes.Robe: return new BasicRobe()
      default:
        throw new Error(`${type} isn't registered!`)
    }
  }
  // .... another create equipments methods
}

const defaultEquipmentFactory = new DefaultEquipmentFactory()

export default defaultEquipmentFactory