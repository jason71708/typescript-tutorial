import Equipments from '../equipments/Equipments'
import Armour from './Armour'
import Role from '../characters/Role'

export default class BasicRobe extends Armour {
  public readonly name = 'Basic Robe'

  public readonly availableRoles = [
    Role.Warlock,
    Role.BountyHunter,
    Role.Highwayman
  ]
}