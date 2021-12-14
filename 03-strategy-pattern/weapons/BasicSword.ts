import Weapon from './Weapon'
import MeleeAttack from '../abilities/MeleeAttack'
import Role from '../characters/Role'

export default class BasicSword implements Weapon {
  public readonly name = 'Basic Sword'

  public attackStrategy = new MeleeAttack()

  public availableRoles = [
    Role.Swordsman,
    Role.Highwayman
  ]
}