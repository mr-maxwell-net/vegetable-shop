(function () {
  const inputs = document.querySelectorAll('.basket-card--qty--input')

  function replaceQty(value) {
    return value.replace(' lb', '')
  }

  function onInputHandler(e) {
    const $article = e.target.closest('.basket-card')
    const $total = $article.querySelector('.basket-card--total')

    if (!$article || !$total) return

    const value = e.target.value
    const price = +($article.dataset?.['price'] || 0)
    const quantity = parseFloat(replaceQty(value))
    const total = (quantity * price).toFixed(2)

    $total.innerText = `$${total}`
  }

  function onFocusHandler(e) {
    const value = e.target.value

    e.target.value = replaceQty(value)
    e.target.setAttribute('type', 'number')
    e.target.setAttribute('min', '0.25')
    e.target.setAttribute('step', '0.25')
  }

  function onBlurHandler(e) {
    const value = e.target.value

    e.target.setAttribute('type', 'text')
    e.target.removeAttribute('min')
    e.target.removeAttribute('step')

    e.target.value = `${value} lb`
  }

  for (const input of inputs) {
    input.addEventListener('input', onInputHandler)
    input.addEventListener('focus', onFocusHandler)
    input.addEventListener('blur', onBlurHandler)
  }
})()