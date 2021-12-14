import Equipments from './Equipments'
import Role from '../characters/Role'

export default interface Equipment {
  readonly name: string
  readonly type: Equipments
  readonly availableRoles: Role[]
}