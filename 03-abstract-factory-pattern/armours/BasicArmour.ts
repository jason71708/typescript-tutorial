import Equipments from '../equipments/Equipments'
import Armour from './Armour'
import Role from '../characters/Role'

export default class BasicArmour extends Armour {
  public readonly name = 'Basic Armour'

  public readonly availableRoles = [
    Role.Swordsman,
    Role.BountyHunter,
    Role.Highwayman
  ]
}