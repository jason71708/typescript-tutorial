import Weapon from './Weapon'
import MagicAttack from '../abilities/MagicAttack'
import Role from '../characters/Role'
import WeaponType from './Types'

export default class BasicWand extends Weapon {
  public readonly name = 'Basic Wand'

  public category = WeaponType.Wand

  public attackStrategy = new MagicAttack()

  public availableRoles = [
    Role.Warlock
  ]
}