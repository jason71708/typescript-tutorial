import { LatLngExpression } from 'leaflet'
const URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json'

type SourceUBikeInfo = {
  sno: string // 站點代號
  sna: string // 場站名稱
  tot: string // 總停車格
  sbi: string // 目前車輛數
  sarea: string // 場站區域
  mday: string // 資料更新時間
  lat: string // 緯度
  lng: string // 經度
  ar: string // 地區
  sareaen: string // 場站區域(英)
  snaen: string // 場站名稱(英)
  aren: string // 地址(英)
  bemp: string // 空位數量
  act: string // 全站禁用狀態
}

export type UBikeInfo = {
  availableBikes: number
  totalBikes: number
  latLng: LatLngExpression
  regionName: string
  stopName: string
}

export default (url = URL) => {
  return fetch(url)
    .then(result => result.json())
    .then(({ retVal }) => Object.keys(retVal).map((key) => retVal[key] as SourceUBikeInfo))
    .then(sourceInfo => sourceInfo.map(sourceInfo => ({
      availableBikes: parseInt(sourceInfo.sbi, 10),
      totalBikes: parseInt(sourceInfo.tot, 10),
      latLng: <LatLngExpression>[
        parseFloat(sourceInfo.lat),
        parseFloat(sourceInfo.lng),
      ],
      regionName: sourceInfo.sarea,
      stopName: sourceInfo.sna
    } as UBikeInfo)))
}