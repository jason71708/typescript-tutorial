// 指定 Generator 型別 <T, TReturn, TNext>
// 若沒指定則 TS 會自動推論，Generator 泛型有預設值
// 但沒指定卻需要用到 yield 做運算回傳的話會被警告 any
// 所以盡量積極註記！
// T 代表 yield 回傳的值的 union
// TReturn 代表 return 回傳的值
// TNext 代表呼叫 Generator.next(TNext) 時帶入的參數型別

function* generatorFunc() { // 推論型別 <1 | 2 | 3, void, unknown>
  yield 1
  yield 2
  yield 3
}
const numbersIter = generatorFunc()
console.log(numbersIter.next())
console.log(numbersIter.next())
console.log(numbersIter.next())
console.log(numbersIter.next())
console.log(numbersIter.next())

function* generatorFunc2(i: number) { // return 後會結束此 generator function (done: true)
  yield i
  yield i + 10
  yield i + 20
  yield i + 2
  yield i
  return i
  yield i
}
const numbersIter2 = generatorFunc2(100)
console.log(numbersIter2.next())
console.log(numbersIter2.next())
console.log(numbersIter2.next())
console.log(numbersIter2.next())
console.log(numbersIter2.next())
console.log(numbersIter2.next())
console.log(numbersIter2.next())

function* generatorFunc3(i: number) { // 執行第一次 next() 時才會執行該 generator function 的程式
  console.log('generatorFunc3')
  yield i
  return i
}
console.log('before create generatorFunc3')
const numbersIter3 = generatorFunc3(100)
console.log('after create generatorFunc3')
console.log('before excute generatorFunc3')
console.log(numbersIter3.next())
console.log('after excute generatorFunc3')
console.log(numbersIter3.next())

function* fibonacci() { // 費氏數列
  console.log('start fibonacci')
  let n0 = 1
  let n1 = 1
  while (true) {
    yield n0 as number

    [n0, n1] = [n1, n0 + n1]
  }
}
const fibSeries = fibonacci()
for (let i = 0; i < 10; i++) {
  console.log(fibSeries.next())
}

// 推入與輸出 Push-Pull Model
// ES6 Generators 的特點在於 —— 藉由 Push - Pull 的機制，可以達到迭代出來的元素可以根據不同的情形更改元素輸出的狀態，
// 因此可以將 Generators 產出的迭代器視為動態（Dynamic）的。
function* summationGenerator(defaultValue: number = 0): Generator<
  number,
  void,
  number
> {
  let total = defaultValue

  while (true) {
    let result = yield total
    total += result ?? 0 // 因為有可能 .next() 沒給參數，所以判斷沒給就賦予 0
  }
}
let summationIter = summationGenerator(10000)
console.log(summationIter.next(5))
console.log(summationIter.next(500))
console.log(summationIter.next(5000))
console.log(summationIter.next(50000))
console.log(summationIter.next()) // 若沒給定指定的 TNext 型別，TS 也不會報錯，猜測預設是可以直接不給參數呼叫 .next()，所以需要在內部 yield 判斷參數型別的正確性。
console.log(summationIter.next('123')) // 但給其他型別依然會報錯

// 惰性求值 Lazy Evaluation
// 表達一個全部都是正整數的無窮數列
function* positiveNumberGenerator() {
  let number = 1

  while (true) {
    yield number
    number += 1
  }
}