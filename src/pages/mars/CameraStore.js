import mars from 'services/api/mars'
import { createHook, createContainer, createStore } from 'react-sweet-state'
import createDebug from 'debug'
const debug = createDebug('mars:camera:store')

const MAX_IMAGES_PER_PAGE = 25
const MAX_PAGES = 10

const initialState = {
  photos: [],
  photosLoaded: 0,
  progress: 0,
  isLoading: false
}

const actions = {
  reset: () => ({ setState }) => {
    setState(draft => initialState)
  },
  fetchPhotos: ({ rover, camera, sol, page = 1 }) => async ({
    getState,
    setState,
    dispatch
  }) => {
    debug('fetching photos')
    setState(draft => {
      draft.isLoading = true
    })

    const response = await mars.images.read({
      rover,
      camera,
      sol,
      page: page
    })

    if (response.photos.length) {
      const localPhotos = []
      const onImageLoad = () => dispatch(actions.addCameraImageLoaded())

      response.photos.forEach(photo => {
        const photoElement = new window.Image()
        photoElement.onload = onImageLoad
        photoElement.src = photo.img_src
        localPhotos.push(photo.img_src)
      })

      setState(draft => {
        draft.photos = getState().photos.concat(localPhotos)
      })

      if (response.photos.length === MAX_IMAGES_PER_PAGE) {
        if (page <= MAX_PAGES) {
          dispatch(actions.fetchPhotos({ rover, camera, sol, page: page + 1 }))
        } else {
          setState(draft => {
            draft.isLoading = false
          })
        }
      } else {
        debug('no more photos, finishing')

        setState(draft => {
          draft.isLoading = false
        })
      }
    } else {
      debug('no photos')

      setState(draft => {
        draft.isLoading = false
      })
    }
  },
  addCameraImageLoaded: () => ({ getState, setState }) => {
    const { photosLoaded, photos } = getState()

    setState(draft => {
      draft.photosLoaded++
      draft.progress = (photosLoaded + 1) / photos.length
    })
  }
}

const Store = createStore({
  initialState,
  actions,
  name: 'Camera'
})

export const useCameraStore = createHook(Store)
export const CameraContainer = createContainer(Store)
