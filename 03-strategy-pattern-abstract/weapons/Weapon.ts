import Character from '../characters/Character'
import Attack from '../abilities/Attack'
import Role from '../characters/Role'
import WeaponType from './Type'

export default abstract class Weapon {
  abstract readonly name: string

  abstract availableRoles: Role[]

  abstract type: WeaponType
  
  abstract attackStrategy: Attack

  public switchAttackStrategy(attack: Attack) {
    const { availableWeapons: weapons } = attack

    if (
      weapons.length === 0 ||
      weapons.indexOf(this.type) !== -1
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