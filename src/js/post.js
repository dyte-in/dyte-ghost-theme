import fitvids from 'fitvids'
import LazyLoad from 'vanilla-lazyload'
import Lightense from 'lightense-images'
import * as tocbot from 'tocbot';
import { docReady } from './helpers'

let $standardContainer = null
let $article = null
let $header = null
let $progressBar = null
let standardContainerTop = 0
let lastScrollingY = window.pageYOffset
let lastWindowHeight = 0
let lastArticleHeight = 0
let isTicking = false

const isPostPage = () => {
  return document.querySelector('body').classList.contains('post-template')
}

const onScrolling = () => {
  lastScrollingY = window.pageYOffset
  requestTicking()
}

const onResizing = () => {
  setHeights()

  setTimeout(() => {
    requestTicking()
  }, 200)
}

const requestTicking = () => {
  if (!isTicking) {
    requestAnimationFrame(updateProgress)
  }

  isTicking = true
}

const updateProgress = () => {
  const progressMax = lastArticleHeight - lastWindowHeight
  const percent = Math.ceil((lastScrollingY / progressMax) * 100)

  if (percent <= 0) {
    setProgress(0)
  } else if (percent <= 100) {
    setProgress(percent)
  } else {
    setProgress(100)
  }

  isTicking = false
}

const setHeights = () => {
  if ($header && $article && $standardContainer) {
    lastWindowHeight = window.innerHeight
    lastArticleHeight =
      $header.offsetHeight +
      $article.offsetHeight +
      standardContainerTop
  }
}

const setProgress = (percent) => {
  if (percent <= 100) {
    if ($progressBar) {
      $progressBar.style.width = `${percent}%`
    }
  }
}

const articleImageLoaded = () => {
  setHeights()
}

docReady(() => {
  const lazyLoadInstance = new LazyLoad({
    elements_selector: '.js-article-image',
    callback_loaded: articleImageLoaded
  })

  const makeTOC = () => {
    const $toc = document.querySelector('.js-toc')

    if ($toc) {
      tocbot.init({
        tocSelector: '.js-toc',
        contentSelector: '.js-article-content',
        hasInnerContainers: true,
        onClick: () => {
          const event = new Event('toc-link-clicked', { bubbles: true })
          $toc.dispatchEvent(event)
        }
      })
    }
  }

  const adjustImageGallery = () => {
    const images = document.querySelectorAll('.kg-gallery-image img')

    images.forEach((image) => {
      const container = image.closest('.kg-gallery-image')
      const width = image.attributes.width.value
      const height = image.attributes.height.value
      const ratio = width / height
      container.style.flex = `${ratio} 1 0%`
    })
  }

  const makeImagesZoomable = () => {
    const images = document.querySelectorAll('.js-article-content img')
    const zoomableImages = []

    images.forEach((image) => {
      const closest = image.closest('figure')
      if (
        closest && closest.classList.contains('kg-bookmark-card')
      ) {
        return
      }

      if (image.parentElement.nodeName === 'A') {
        return
      }

      zoomableImages.push(image)
    })

    Lightense(zoomableImages, {
      zIndex: 5000
    })
  }

  makeImagesZoomable()
  adjustImageGallery()
  makeTOC()
  fitvids('.js-article-content')

  if (!isPostPage()) {
    return
  }

  window.addEventListener('scroll', onScrolling, { passive: true })
  window.addEventListener('resize', onResizing, { passive: true })
})

window.onload = () => {
  if (!isPostPage()) {
    return
  }

  $progressBar = document.querySelector('.js-header-progress')
  $standardContainer = document.querySelector('.js-standard-container')
  $article = document.querySelector('.js-article')
  $header = document.querySelector('.js-header')
  standardContainerTop =
    parseInt(window.getComputedStyle($standardContainer, null).paddingTop)
  lastScrollingY = window.pageYOffset

  setHeights()
  updateProgress()
}
