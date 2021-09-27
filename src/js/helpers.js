export const docReady = (fn) => {
  if (
    document.readyState === 'complete' || document.readyState === 'interactive'
  ) {
    setTimeout(fn, 1)
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

export const isRTL = () => {
  const $html = document.querySelector('html')
  return ['ar', 'he', 'fa'].includes($html.getAttribute('lang'))
}

export const injectCssVariables = () => {
  const $portalRoot = document.querySelector('#ghost-portal-root iframe')

  if ($portalRoot) {
    const $iframeBody = $portalRoot.contentWindow.document.documentElement

    const backgroundColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--hero-background-color')

    const foregroundColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--footer-text-color')

    $iframeBody.style.setProperty('--background-color', backgroundColor)
    $iframeBody.style.setProperty('--foreground-color', foregroundColor)

    $iframeBody
      .querySelector('.gh-portal-notification')
      .style
      .backgroundColor = 'var(--background-color)'

    $iframeBody
      .querySelector('.gh-portal-notification p')
      .style
      .color = 'var(--foreground-color)'

    $iframeBody
      .querySelector('.gh-portal-notification a')
      .style
      .color = 'var(--foreground-color)'
  }
}
