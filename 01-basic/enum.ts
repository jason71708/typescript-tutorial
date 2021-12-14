// 列舉 enum
// 實務上應用列舉的時機
// 1. 單純已經符合使用列舉的標準：
//  - 資料互不重複，符合資料獨有性
//  - 資料排序上沒太大意義，符合資料無序性
// 2. 實務上使用列舉的時機，除了符合標準外，其資料形式沒有這些狀況：
//  - 自組型擴張：資料可以運用原本的資料組合進行擴充（檔案權限可分：讀取、寫入以及執行，但是這三種模式可以擴張成共 8 種情形
//  - 應用型擴張：資料在未來的變動機率大，進行擴充性的機會也相對就高（車站站線有很大機率會擴建，造成資料可被列舉種類擴大

enum WeekDay { // 定義 enum 時不需要 =
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
console.log(WeekDay)

// 觀察 enum 編譯成 JS 後 WeekDay 的最終結果
//{ '0': 'Sunday',
// '1': 'Monday',
// '2': 'Tuesday',
// '3': 'Wednesday',
// '4': 'Thursday',
// '5': 'Friday',
// '6': 'Saturday',
// Sunday: 0,
// Monday: 1,
// Tuesday: 2,
// Wednesday: 3,
// Thursday: 4,
// Friday: 5,
// Saturday: 6 }
// 列舉具有反射性，所以可以藉由列舉呼叫元素出來的結果反查該元素本身的名稱

// 順向的結果 —— 儘管實際上是數字 0，但是推斷結果為 Enum 型別，而非 number
// 逆向取回列舉的鍵（Key）的結果是字串型別 string
let firstDay: WeekDay = WeekDay.Sunday
console.log(firstDay) // 0
let valueOfFirstDay = WeekDay[firstDay]
console.log(valueOfFirstDay) // 'Sunday'