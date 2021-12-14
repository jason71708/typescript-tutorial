// `outFile` 有使用上的限制：
// 必須要在模組規範為 `amd` 或 `system` 下才能進行打包成單一檔案的動作，也就是說，編譯器設定裡的 `module` 選項只能為 `'amd'` 或 `'system'`，預設的 `commonjs` 是錯誤的喔！

// Triple Slash Directive
// 引入命名空間模組
/// <reference path="other.ts" />

// 2014 年那時候 ES2015 的標準還沒出來，(export/import 語法)
// 所以 TypeScript 必須要有特定的解法去實踐模組的載入與輸出系統，於是 TypeScript Module 與 Namespaces 出來了。
// 因為第三方套件 —— 有些的定義檔 Definition Files 就使用 Namespace 包裝一系列型別宣告相關的程式碼，然後就沒有再改，因為怕改了之後造成連鎖反應（Chain Reaction），讓相依的其他套件壞光光。
// 但對於現在的專案開發來說 Namespace 對於 TypeScript 或現在的 JS 開發而言是一種 Old Fashion 的手法，幾乎沒有出現了。
