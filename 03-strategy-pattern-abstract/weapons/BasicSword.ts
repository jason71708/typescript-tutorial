import Weapon from './Weapon'
import MeleeAttack from '../abilities/MeleeAttack'
import Role from '../characters/Role'
import WeaponType from './Type'

export default class BasicSword extends Weapon {
  public readonly name = 'Basic Sword'

  public type = WeaponType.sword

  public attackStrategy = new MeleeAttack()

  public availableRoles = [
    Role.Swordsman,
    Role.Highwayman
  ]
}