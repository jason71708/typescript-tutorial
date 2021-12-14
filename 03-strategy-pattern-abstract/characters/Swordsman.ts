import Role from './Role'
import Character from './Character'
import BasicSword from '../weapons/BasicSword'

export default class Swordsman extends Character {
  constructor(name: string) {
    super(
      name,
      Role.Swordsman,
      new BasicSword()
    )
  }
}