import Weapon from './Weapon'
import MagicAttack from '../abilities/MagicAttack'
import Role from '../characters/Role'
import WeaponType from './Type'

export default class BasicWand extends Weapon {
  public readonly name = 'Basic Wand'

  public type = WeaponType.wand

  public attackStrategy = new MagicAttack()

  public availableRoles = [
    Role.Warlock
  ]
}