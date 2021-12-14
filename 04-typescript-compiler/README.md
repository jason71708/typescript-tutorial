# TypeScript Compiler Compile Configurations

直接指令式設定：
`tsc --<config-1> <config-1-value> --<config-2> <config-2-value>`

## tsconfig.js 專案相關

- `target` 選項：主要目標是設定專案被編譯過後的語言版本，預設值為 ES3 版本（官方指定的）；可以選擇其他版本諸如：ES5、ES6（或 es2015 以上）甚至還有 ESNext
- `lib` 選項：可以指定要載入的宣告性群組，通常是指功能層面（Utility Aspect）的宣告，不是語法層面。選項眾多，常見的是 dom、es2015 等等選項。
- `module` 選項：代表被編譯過後，應該要採用的模組語法之規範，比如 commonjs、amd 或 es6 等

## 語法層面與功能層面的差異

- 語法層面（Syntatic Aspect）泛指單純語法解析上的特點，通常語法是自然內建在編譯器的
- 功能層面（Utility Aspect）泛指可以藉由語法實踐的功能，並非內建在編譯器，通常會以函式庫（Library）的方式載入，或以 ECMAScript 的觀點來看 —— 以 Polyfill 的方式載入功能。

而 TypeScript 編譯器裡的 `lib` 選項就是對於 TypeScript 專案的功能層面的擴充，比如可以使用 ES6 規範的 `Promise` 或更多 ES6 以後的特殊 `Array` 相關的成員方法

## 輸出專案相關設定 Output Related Configurations

- `rootDir` 代表的是專案的檔案必須存放的地方，如果超出 `rootDir` 指定的範圍，並且沒有啟用 `noEmitOnError` 選項 —— TypeScript 編譯器照樣會編譯出結果，但也會拋出警告訊息提醒開發者超出 `rootDir` 規範的範圍
- `outDir` 則是指定專案被編譯過後，輸出之結果存放的地方 —— 其中，若專案有樹狀結構資料夾分佈，則會按照該樹狀結構編譯出結果
- `outFile` 則是將專案打包成單一檔案，但限制是 module 選項必須為 `amd` 或 `system` 模式 —— 因為跟模組的規範有關
  - 另外，`outFile` 與 `outDir` 這兩個是完全不相干的設定，所以 `outFile` 不會在 `outDir` 指定的資料夾產出結果
  - 若同時出現 `outFile` 與 `outDir` 選項，TypeScript 編譯器裝作沒看見 `outDir` 這個設定

## Nullable Types 為獨立原始型別 —— `strictNullChecks`

`strictNullChecks` 模式下，會將 Nullable Types 視為獨立的原始型別，因此：

- 任何被註記為 Nullable Types 的變數只能接收該 Nullable Types
- Nullable Types 的值除了能夠被指派到有註記到 Nullable Types 的變數外，也可以被指派到 `any` 型別的變數
- 將 `strickNullChecks` 啟用的話，`null` 或 `undefined` 會被視為獨立的原始型別
