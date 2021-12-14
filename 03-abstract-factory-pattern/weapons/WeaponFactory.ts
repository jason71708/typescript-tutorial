import Weapon from './Weapon'
import Type from './Types'

import BasicSword from './BasicSword'
import BasicWand from './BasicWand'
import Dagger from './Dagger'

export default class WeaponFactory {
  public createWeapon(type: Type): Weapon {
    switch (type) {
      case Type.Sword: return new BasicSword()
      case Type.Wand: return new BasicWand()
      case Type.Dagger: return new Dagger()
      default:
        throw new Error(`${type} isn't registered!`)
    }
  }
}