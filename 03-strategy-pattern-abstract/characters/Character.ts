import Role from './Role'
import Weapon from '../weapons/Weapon'
import Attack from '../abilities/Attack'

export default class Character {
  constructor(
    public readonly name: string,
    public readonly role: Role,
    private weaponRef: Weapon
  ) {}

  public introduce() {
    console.log(`
      Hi, I'm ${this.name} the ${this.role}!
    `)
  }

  public attack(target: Character) {
    this.weaponRef.attack(this, target)
  }

  public equip(weapon: Weapon) {
    const { availableRoles: roles } = weapon

    if (
      roles.length === 0 ||
      roles.indexOf(this.role) !== -1
    ) {
      console.log(`${this.name} has equipped "${weapon.name}"!`)
      this.weaponRef = weapon
    } else {
      throw new Error(`${this.role} cannot equip ${weapon.name}`)
    }
  }

  public switchAttackStrategy(attack: Attack) {
    this.weaponRef.switchAttackStrategy(attack)
  }
}