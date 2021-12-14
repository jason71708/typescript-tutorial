import Weapon from './Weapon'
import MeleeAttack from '../abilities/MeleeAttack'
import Role from '../characters/Role'
import WeaponType from './Types'

export default class BasicSword extends Weapon {
  public readonly name = 'Basic Sword'

  public category = WeaponType.Sword

  public attackStrategy = new MeleeAttack()

  public availableRoles = [
    Role.Swordsman,
    Role.Highwayman
  ]
}