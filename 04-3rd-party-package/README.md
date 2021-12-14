# 3rd-Party Package & TypeScript Declaration File

宣告檔的目的 The Purpose of TypeScript Declaration Files

- 有些本身使用原生 JavaScript 撰寫出來的第三方套件，若不想要再額外寫 TypeScript 版本的話 —— 可以改採撰寫宣告檔（Declaration Files)
- 目的是要能夠讓 TypeScript 在原生 JavaScript 撰寫出來的程式碼，包裝其型別系統的定義，以利於 TypeScript 與原生 JavaScript 進行合作。

使用宣告檔與型別定義的宣告 Using Declaration Files & Declaring Type Definition

- 型別定義的宣告通常不會和主程式放在普通的 `.ts` 檔案，而是會額外放置在 `.d.ts` 檔案。

有 `declare` 跟沒 `declare` 的差別在於，儘管 `declare` 的變數沒有指派任何東西進去，TypeScript 依然認定為該會由某個開發者不需要知道的地方提供出來，
而這裡指的某個地方就可能存在於外來套件模組等等。(參照 jquery.d.ts)

引入第三方套件 Integrating 3rd Party Packages

- 引入第三方套件的原則不一定，通常熱門的套件都會有相對應的 Declaration Files，而這些宣告檔都匯集在 Definitely Typed 這個 GitHub Repo. 裡。
- 第三方套件的型別宣告檔，通常都會以 `@types/<package>` 的格式作為名稱。然而，`@types/<package>` 不會包含原套件的 JS 程式碼，因此有可能必須同時下載套件的原始碼。
- 另外，有些本來就有使用 TypeScript 作為開發的套件，本來就會有對應的型別宣告檔，此時就不需要再額外下載 `@types/<package>` 相關得檔案。
