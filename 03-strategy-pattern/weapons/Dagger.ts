import Weapon from './Weapon'
import StabAttack from '../abilities/StabAttack'

export default class Dagger implements Weapon {
  public readonly name = 'Dagger'

  public attackStrategy = new StabAttack()

  public availableRoles = []
}