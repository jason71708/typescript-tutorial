import { districts } from './districtData'
import fetchData from './fetchData'
import UBikeMapFacade from './MapFacade'


(function () {
  const mapFacade = new UBikeMapFacade()

  const $selectDistrict = <HTMLSelectElement | null>document.getElementById('district-selector')

  districts.forEach(d => {
    const $optionTag = document.createElement('option')
    $optionTag.setAttribute('value', d)
    $optionTag.innerText = d
    $selectDistrict?.appendChild($optionTag)
  })

  $selectDistrict?.addEventListener('change', event => {
    const { value } = event.target as HTMLSelectElement
    mapFacade.clearStops()
    updateBikeMap(value)
  })

  const updateBikeMap = (currentDistrict: string) => {
    fetchData().then(data => {
      const selectData = data.filter(info => info.regionName === currentDistrict)

      mapFacade.pinStops(selectData)
    })
  }

  const currentDistrict = $selectDistrict?.value

  if (currentDistrict) {
    updateBikeMap(currentDistrict)
  }
}())