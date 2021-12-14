# 抽象類別 (Abstract Clas)

如果想要兼顧介面與類別的優勢，繼承父類別的同時，也能夠彈性地宣告規格，而非直接實踐出過程，則可以選擇使用抽象類別 (Abstract Clas)，詳情參照 Weapon.ts

## 繼承 AbstractC 的子類別擁有以下特性與條件:

- 繼承了 AbstractC 的成員變數 Prop 與成員方法 Method
- 必須實踐成員變數 Pabstract 以及成員方法 Mabstract

## 抽象類別的限制 Limitation of Abstract Class:

- 抽象類別不能進行建立物件的動作：因為裡面的抽象成員是還未實踐的狀態，就算硬要從抽象類別建立物件，該物件也會是不完整狀態
- 根據前一點推斷：抽象類別生來就是要被繼承的
- 抽象類別裡的抽象成員（Abstract Member），由於要滿足介面的特性 —— 代表規格並且強迫繼承的子類別必須實踐功能，因此抽象成員必需被實踐為 `public` 模式

## 讀後問題：

由於抽象類別的成員必須被實踐為 `public` 模式，以本程式碼來說，創建 Weapon 類別的物件後，可以直接存取 `attackStrategy`，
並直接改變 `attackStrategy`，略過 `switchAttackStrategy` 的邏輯，造成武器與攻擊 `mapping` 上的錯誤

```js
const problematicDagger = new Dagger();
problematicDagger.attackStrategy = new MagicAttack();
swordsman.equip(problematicDagger);
swordsman.attack(warlock);
```

解法：實作抽象類別的類別本身實作抽象成員時設 `readonly`，就無法透過該類別建立的物件直接修改 `attackStrategy`
而 `switchAttackStrategy` 還是能修改 `attackStrategy` 的原因是，`switchAttackStrategy` 是在抽象類別內定義，
抽象類別本身定義的抽象成員沒有設 `readonly`，所以抽象類別本身的 `switchAttackStrategy` 可以修改 `attackStrategy`
