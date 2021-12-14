import Weapon from './Weapon'
import StabAttack from '../abilities/StabAttack'
import WeaponType from './Types'
import Attack from '../abilities/Attack'

export default class Dagger extends Weapon {
  public readonly name = 'Special Dagger'

  public readonly category = WeaponType.Dagger

  public readonly attackStrategy: Attack = new StabAttack()

  public readonly availableRoles = []
}