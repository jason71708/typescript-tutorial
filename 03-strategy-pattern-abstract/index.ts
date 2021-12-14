import Swordsman from './characters/Swordsman'
import Warlock from './characters/Warlock'

import Dagger from './weapons/Dagger'
import BasicSword from './weapons/BasicSword'

import StabAttack from './abilities/StabAttack'
import MeleeAttack from './abilities/MeleeAttack'

const swordsman = new Swordsman('Max')
const warlock = new Warlock('John')

swordsman.introduce()
swordsman.equip(new Dagger())
swordsman.attack(warlock)
swordsman.equip(new BasicSword())
swordsman.attack(warlock)
swordsman.switchAttackStrategy(new StabAttack())
swordsman.attack(warlock)
