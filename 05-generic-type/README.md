## 泛用型別的概念 Concept of Generic Types

泛用型別的意義最主要是將型別化名進行參數化（Parameterize）的動作，使得型別化名擁有更多的彈性與變化性。

## 泛用型別化名 Generic Type Alias

泛用型別的表現形式不單單只有型別（Type）而已，介面與類別皆可以轉換成泛用型式。

在泛用型別化名的名稱後面接上的 <> 內容就是型別參數（Type Parameter）的宣告。

型別參數可以有複數個，只要在 <> 裡用逗號分隔就可以了。

## 泛用化名的型別參數 Type Parameter(s) of Generic Types

除非型別參數有預設值（又可稱作預設型別參數 Default Type Parameter），否則本身為泛用形式的型別化名，少掉任何一個型別參數的值就會出錯。

## 泛用型別化名的型別參數限制 Type Constraint in Generic Type Alias

某泛用型別化名 GT 之型別參數 Tparam 被限制在某型別 Tcontraint 範圍之下，可以使用 extends 關鍵字，其格式為：

```
type GT<Tparam extends Tconstraint> = ...
```

## 子類別繼承泛用類別的情形 Child Class Inherit Generic Class

分成兩種形式，若子類別為普通類別時，繼承到的泛用父類別必須確切指名該型別參數的確切型別值。

然而若子類別也是泛用類別時，則繼承到的泛用父類別除了可以指定特定的型別外，也可以填入子類別所宣告的型別參數建立型別上的連結。

## 類別綁定泛用介面的情形 Class Implementing Generic Interface(s)

分成兩種形式，若類別為普通類別時，實踐到的泛用介面必須確切指名該介面之型別參數的確切型別值。

然而若類別也是泛用類別時，則實踐到的泛用介面除了可以指定特定的型別外，也可以填入泛用類別所宣告的型別參數建立型別上的連結。

## 迭代器的定義 Definition of Iterator

專門用來巡訪（Iterate）亦或者遍歷（Traverse）目標聚合物（Collection）的內容。

## 迭代器 Iterator V.S. 聚合物 Collection

聚合物（Collection）泛指常見的聚合型資料結構，不限列狀、環狀、樹狀或者是圖（Graph）。

迭代器則是負責巡訪聚合物的物件，而非聚合物本身。

## 迭代器模式 Iterator Pattern

迭代器模式的主要目的在於不需要知曉任意聚合物的細節，就可以依序遍歷內含的每一個元素。

也就是說，我們可以宣告統一的產出迭代器的介面（Iterator Generator Interface），而任何互相毫無關聯甚至是實作上天差地遠的聚合物，都可以藉由實踐該介面，產出同樣功能的迭代器，達到泛用的效果。

## Generators 的性質

從 Generators 產出的迭代器不會馬上動作
執行過程上：迭代器呼叫第一次的 next 方法，該迭代器就會執行到 Generator 函式的第一個 yield 位置；亦或者，如果沒有 yield，就會執行到 return 為止
迭代過程上：迭代器呼叫第一次的 next 方法，並且執行到第一次 yield 的位置時，會將 yield 旁邊的值（可能也包含 undefined）進行輸出的動作；如果沒有 yield 則是會將 return 的結果值輸出
迭代器只要在第 n 次呼叫 next 方法並且代入任何值，該值就會取代前一個 yield 關鍵字的位置

## 惰性求值 Lazy Evaluation

惰性求值的概念在於 —— 需要用到值的時候，再把值求取（Evaluate）出來。

好處在於，除了可以表示無窮元素列表的概念外，如果遇到運算負荷重，但不需要馬上處理的邏輯時，可以採取這種惰性求值的策略 —— 需要處理時再去處理。

除了 ES6 Generators 產出的迭代器具有惰性求值的性質外，另一個是在本系列提到的單例模式篇章（Singleton Pattern）中，如果遇到建構單子耗費的資源稍微龐大但又不太需要即時建構的情形，就可以延遲建構單子，此為懶漢模式。

## 積極求值 Eager Evaluation

積極求值相對於惰性求值 —— 是即時運算的行為。

一般程式語言的任何表達式（Expressions），基本上都是積極求值的行為，如：

指派表達式（Assignment Expression）：`let a = 1` 會立刻將數值 1 指派到變數 a 身上（可以查看關於 Memory Allocation 相關的行為）
運算表達式（Arithmetic Expression）：`3 + 5` 會立刻求值為結果 8
邏輯表達式（Logical Expression）：`10 >= 8` 會立刻比對數值 10 是否大於等於 8，立馬求值的結果為 true
函式/方法的呼叫（Function/Method Invocation）：`Math.pow(2, 3)` 會立刻運算出結果 8
積極求值的優點在於事情一到就會立刻進行，但同時也是缺點的地方在於，如果資源過大，很容易會有程式卡住的情形。

## Asynchronous Programming

> 啟始於 Callback Hell，攤平為 Promise Chain，乘載於 Generator Functions，演變成 Async Functions。

> Originated from Callback Hell, flattened into Promise Chain, combined with Generator Functions, evoluted as Aysnchronous Functions.

## Generators 在非同步編程的演變過程中的角色

運用 Push-Pull Model 的性質 —— 結合遞迴（Recursion）的手法，我們可以取代 Promise Chain 的語法行為。

而 Generators 的寫法好處在於，我們可以自由地在 Generators 內部：

對 response 進行 Data Reshaping 的邏輯
進行 try...catch... 相關的錯誤處理
甚至你也可以 `yield Promise.all([...])` 對多個請求進行平行化處理

## 非同步函式 Asynchronous Function

自 Generator 結合 Promise Chain 的概念演化出來的結果，為 ES7 的標準。

非同步函式可以用同步的語法撰寫各種非同步行為，使得：

- 程式碼可讀性大幅提升
- 提供另一種方式操作 Promise 物件，可以使用 await 來等待 Resolve 出來的結果
- 錯誤處理更直觀，可以直接使用 try...catch... 敘述式寫非同步程序的錯誤處理部分
- 非同步程序可以進行高度抽象化
- 非同步程序又可以互相用 await 組合（await 其他 Async Function 的執行結果）
- await Promise.all 可以等待多個非同步程序的執行結果
- await Promise.race 可以等待多個非同步程序的其中一項最先執行完畢的結果
- 非同步函式的推論結果必須要是 `Promise<T>` 類型的結果，如果積極註記為非 `Promise<T>` 相關型別的物件，TypeScript 會出現警告！
