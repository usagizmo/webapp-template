import { onImagesLoaded } from '../utils'

export const removeInitialCover = function () {
  onImagesLoaded('img[src]', function () {
    document
      .querySelector('#initial-cover')
      .classList.add('opacity-0', 'pointer-events-none')
  })
}
