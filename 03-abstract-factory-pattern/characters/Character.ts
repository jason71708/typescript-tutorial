import Role from './Role'
import Weapon from '../weapons/Weapon'
import Attack from '../abilities/Attack'
import Armour from '../armours/Armour'
import Equipment from '../equipments/Equipment'

export default class Character {
  constructor(
    public readonly name: string,
    public readonly role: Role,
    private weaponRef: Weapon,
    private armourRef: Armour
  ) {}

  public introduce() {
    console.log(`
      Hi, I'm ${this.name} the ${this.role}!
      I have ${this.weaponRef.name} and ${this.armourRef.name}.
    `)
  }

  public attack(target: Character) {
    this.weaponRef.attack(this, target)
  }

  public equip(equipment: Equipment) {
    const { availableRoles: roles } = equipment

    if (
      roles.length === 0 ||
      roles.indexOf(this.role) !== -1
    ) {
      if (equipment instanceof Weapon) {
        this.weaponRef = equipment
      } else if (equipment instanceof Armour) {
        this.armourRef = equipment
      }
      console.log(`${this.name} has equipped "${equipment.name}"!`)
    } else {
      throw new Error(`${this.role} cannot equip ${equipment.name}`)
    }
  }

  public switchAttackStrategy(attack: Attack) {
    this.weaponRef.switchAttackStrategy(attack)
  }
}