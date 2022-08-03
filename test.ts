interface Eat {
  digestiveSpeed: number
  eat: (food: string) => void
  drink: () => void
}

class Man implements Eat {
  constructor(public name: string) { }
  eat() { // 實作界面方法，若介面方法有定義參數型別，則可接受參數為 undefined
  }
  drink(beverage: string) { // 但若介面方法沒有定義參數型別，則實作界面方法時需要兼容 undefined
  }
}

class OldMan extends Man {
  constructor(name: string) {
    super(name)
  }
  eat(food: string | number | null) { // 同上，需要兼容 Man 定義的 eat: () => void
  }
}

// 原則上還是遵照介面定義的規格實作，避免在實作 class 與其衍生 class 時擴增參數型別。