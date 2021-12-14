import Swordsman from './characters/Swordsman'
import Warlock from './characters/Warlock'

import Dagger from './weapons/Dagger'

const swordsman = new Swordsman('Max')
const warlock = new Warlock('John')

swordsman.introduce()
swordsman.attack(warlock)
swordsman.equip(new Dagger())
swordsman.attack(warlock)
