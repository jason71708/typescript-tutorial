let name = '123'

// TypeScript: Error: *cannot redeclare block-scoped*

// 以 variable 'name' 為例：

// * TypeScript 預設不會將文件內容識別為一個個 module，除非在檔案內有 import 或 export 關鍵字。
// * 無特別設定的話，TypeScript 執行環境為 window，所以與 window.name 變數命名衝突了。
// * 是其他變數則看是否是自己重複定義了或是和*套件內的變數名*衝突。

// 解法：

// * 通用：檔案內有 import 或 export 關鍵字，例如：export {};
// * 與環境內已有的變數名衝突，那就改變執行環境：
// * // tsconfig.json
//     {
//       "compilerOptions": {
//           "lib": [
//               "es2015" // 這樣就不是在 DOM 環境了
//           ]
//       }
//     }

// * 若為套件原因，可以 import 並命名成其他變數名：
// * import * as pluginCard from "some-plugin/card";
//     let card:SomeCardType // working!

// * 若套件沒有 TS 定義：
// * declare module "card" {
//         declare var card: any;
//         export = card;
//     }


