import Weapon from './Weapon'
import StabAttack from '../abilities/StabAttack'
import WeaponType from './Type'
import Attack from '../abilities/Attack'

export default class Dagger extends Weapon {
  public readonly name = 'Special Dagger'

  public readonly type = WeaponType.dagger

  public readonly attackStrategy: Attack = new StabAttack()

  public readonly availableRoles = []
}