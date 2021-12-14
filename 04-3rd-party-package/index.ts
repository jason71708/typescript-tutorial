$(document).ready(function() {
  const $btn = $('#mainBtn')
  const $count = $('#count')
  let count = 0

  $btn.click(() => {
    count++
    $count.text(count)
  })
})