import Weapon from './Weapon'
import MagicAttack from '../abilities/MagicAttack'
import Role from '../characters/Role'

export default class BasicWand implements Weapon {
  public readonly name = 'Basic Wand'

  public attackStrategy = new MagicAttack()

  public availableRoles = [
    Role.Warlock
  ]
}