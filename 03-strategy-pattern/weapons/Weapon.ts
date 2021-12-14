import Attack from '../abilities/Attack'
import Role from '../characters/Role'

export default interface Weapon {
  readonly name: string

  availableRoles: Role[]
  
  attackStrategy: Attack
}