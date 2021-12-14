namespace MyMath { // 命名空間的宣告 TypeScript Namespaces Declaration
  // 如果想要讓命名空間提供各種功能的話，必須使用 export 關鍵字
  export const PI = 3.14

  export function areaOfCircle(radius: number): number {
    return PI * (radius ** 2)
  }

  export function circumference(radius: number): number {
    return 2 * PI * radius
  }

  // 若要讓巢狀空間可以在外部做使用，巢狀空間本身也要使用 export 關鍵字
  export namespace Rectangle { // 巢狀命名空間 Nested Namespaces/Multi-layer Namespaces
    export function area(width: number, height: number): number {
      return width * height
    }
  }

  export interface MyDocument {
    name: string,
    id: string
  }

  function noExportFunction () {}
}
// 若想要使用命名空間 N 輸出的功能，則可以使用點 . 來呼叫
MyMath.PI
// 若要使用巢狀空間輸出的功能
MyMath.Rectangle.area

// 命名空間的融合 Namespaces Merging (官方統稱為宣告的融合 Declaration Merging)
namespace MyMath {
  export const PI = 4 // 同個空間不能定義重複的變數 (邏輯等同於在同份檔案內情況)

  // 但如果是介面（TypeScript Interface）這種具備可融合的特性，則可以。
  export interface MyDocument {
    children: string[]
  }

  export namespace Rectangle {
    export function circumference(width: number, height: number): number {
      return 2 * (width + height)
    }
  }

  export function useNoExportFunction () {
    // Q: 同個命名空間下，能不能交互使用沒有輸出的功能？ A: 不行
    return noExportFunction()
  }
}
MyMath.Rectangle.circumference(100, 200) //  相同命名空間會合併