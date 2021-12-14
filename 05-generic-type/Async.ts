type PongResponse = {
  data: string | null
  status: 200 | 500
}

type PongResponsePromise = Promise<PongResponse>

function pingRequest(
  num: number,
  errorProbability: number = 0
): PongResponsePromise {
  return new Promise((resolve, reject) => {
    const probability = Math.random()
    if (probability < errorProbability) {
      reject({ data: null, status: 500 })
    }

    const timeout = Math.random() * 3000
    setTimeout(() => {
      resolve({ data: `Pong: ${num}`, status: 200 })
    }, timeout)
  })
}

/* Promist Chain */
console.time('1st Pong')
console.time('2nd Pong')
console.time('3rd Pong')
console.log('Promise Chain Representation')
pingRequest(1)
  .then(response => {
    console.log(response.data)
    console.timeEnd('1st Pong')
    return pingRequest(2)
  })
  .then(response => {
    console.log(response.data)
    console.timeEnd('2nd Pong')
    return pingRequest(3)
  })
  .then(response => {
    console.log(response.data)
    console.timeEnd('3rd Pong')
  })

/* Generator */
console.time('1st Generator Pong')
console.time('2nd Generator Pong')
console.time('3rd Generator Pong')
function* pingsGenerator(): Generator<PongResponsePromise, void, PongResponse> {
  try {
    const response1 = yield pingRequest(1)
    console.log(response1.data)
    console.timeEnd('1st Generator Pong')
  } catch (err1) {
    throw new Error(JSON.stringify(err1))
  }

  try {
    const response2 = yield pingRequest(2)
    console.log(response2.data)
    console.timeEnd('2nd Generator Pong')
  } catch (err2) {
    throw new Error(JSON.stringify(err2))
  }

  try {
    const response3 = yield pingRequest(3)
    console.log(response3.data)
    console.timeEnd('3rd Generator Pong')
  } catch (err3) {
    throw new Error(JSON.stringify(err3))
  }
}

let pingsIter = pingsGenerator();
(pingsIter.next().value as PongResponsePromise).then(response1 => {
  console.log('Response 1 received');

  (pingsIter.next(response1).value as PongResponsePromise).then(response2 => {
    console.log('Response 2 received');

    (pingsIter.next(response2).value as PongResponsePromise).then(response3 => {
      console.log('Response 3 received');

      pingsIter.next(response3)
    })
  })
})

// 但上面 Generator 執行方式太過複雜，故可寫遞迴函式處理
function runGenerator<T>(gen: () => Generator<Promise<T>, void, T>) {
  const iter = gen()

  // 使用遞迴技巧處理 request、response 過程的邏輯
  function recursiveIteration(pushResponse: T) {
    const result = iter.next(pushResponse)
    if (result.done) return

    (result.value as Promise<T>).then(response => {
      recursiveIteration(response)
    })
  }

  (iter.next().value as Promise<T>).then(response => {
    recursiveIteration(response)
  })
}
runGenerator<PongResponse>(pingsGenerator)

// ES7 Async - Await 的運作機制
// 就是把 Promise Chain 換作的 Generator 形式：
// - 將 Generator Function 改成 async function 寫法
// - 將 yield 關鍵字取代成 await
async function pingsAsyncFunc() {
  try {
    const response1 = await pingRequest(1)
    console.log(response1.data)
    console.timeEnd('1st Async Pong')
  } catch (err1) {
    throw new Error(JSON.stringify(err1))
  }

  try {
    const response2 = await pingRequest(2)
    console.log(response2.data)
    console.timeEnd('2nd Async Pong')
  } catch (err2) {
    throw new Error(JSON.stringify(err2))
  }

  try {
    const response3 = await pingRequest(3)
    console.log(response3.data)
    console.timeEnd('3rd Async Pong')
  } catch (err3) {
    throw new Error(JSON.stringify(err3))
  }
}
console.log('Using Async Function:')
console.time('1st Async Pong')
console.time('2nd Async Pong')
console.time('3rd Async Pong')

pingsAsyncFunc()
  .then(() => {
    console.log('End Async Request Process!')
  })
