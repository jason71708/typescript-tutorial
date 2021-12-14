# 工廠模式 Factory Method Pattern

從策略模式的篇章，到現在會發現：

> 每一次要選擇某項策略時，必須要將該策略載入（import）檔案後，我們才可以使用

這樣會造就一種很恐怖的狀況：假設今天角色的武器種類有十種以上 ...，每一次要更換新的武器必須要載入該武器，並且將該武器建構起來再代入角色的 `equip` 方法。

## 總結

- 工廠模式主要是將性質相近的物件 —— 與其分別各自進行建立物件的動作，不如讓一個工廠類別匯集那群物件，讓使用者可以在統一的窗口進行建立物件的動作。
- 另外，在 Design Pattern 原著的書籍裡，Factory Method 模式的定義下有兩個主角：Factory 類別以及對應的 Product 類別。
- 而 Factory 類別裡的 createProduct 方法就是俗稱的工廠方法 —— Factory Method。
- 理想情況下，一個 Factory 只會建造出對應的一種 Product。
- 但 Factory Method 的其中一種變體是：可以藉由將工廠方法宣告參數的動作，指名要建造的不同 Product 物件。
