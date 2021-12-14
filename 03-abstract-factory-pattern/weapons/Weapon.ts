import Character from '../characters/Character'
import Attack from '../abilities/Attack'
import Role from '../characters/Role'
import WeaponType from './Types'
import Equipment from '../equipments/Equipment'
import Equipments from '../equipments/Equipments'

export default abstract class Weapon implements Equipment {
  abstract readonly name: string

  abstract availableRoles: Role[]

  public type = Equipments.weapon

  abstract category: WeaponType

  abstract attackStrategy: Attack

  public switchAttackStrategy(attack: Attack) {
    const { availableWeapons: weapons } = attack

    if (
      weapons.length === 0 ||
      weapons.indexOf(this.category) !== -1
    ) {
      console.log(`Switch Attack!`)
      this.attackStrategy = attack
    } else {
      throw new Error(`${this.name} cannot use this attack.`)
    }
  }

  public attack(self: Character, target: Character) {
    this.attackStrategy.attack(self, target, this)
  }
}