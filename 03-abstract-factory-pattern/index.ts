import Swordsman from './characters/Swordsman'
import Warlock from './characters/Warlock'

// 實作武器工廠後，就不用一一載入各個武器了
// import Dagger from './weapons/Dagger'
// import BasicSword from './weapons/BasicSword'

import WeaponFactory from './weapons/WeaponFactory'
import WeaponTypes from './weapons/Types'

import StabAttack from './abilities/StabAttack'

const weaponFactory = new WeaponFactory()

const swordsman = new Swordsman('Max')
const warlock = new Warlock('John')

swordsman.introduce()
swordsman.equip(weaponFactory.createWeapon(WeaponTypes.Dagger))
swordsman.attack(warlock)
swordsman.equip(weaponFactory.createWeapon(WeaponTypes.Sword))
swordsman.attack(warlock)
swordsman.switchAttackStrategy(new StabAttack())
swordsman.attack(warlock)