import mars from 'api/mars'
import { createHook, createContainer, createStore } from 'react-sweet-state'
import createDebug from 'debug'
const debug = createDebug('mars:camera:store')

const MAX_PHOTOS_PER_PAGE = 25
const MAX_PAGES = 10
const FIRST_PAGE = 1
let fetchCounter = 1

const initialState = {
  photos: [],
  photosLoaded: 0,
  progress: 0,
  isLoading: false,
  error: null
}

const actions = {
  reset: () => ({ setState }) => {
    setState(draft => initialState)
  },
  fetchPhotos: ({ rover, camera, sol, page = FIRST_PAGE }) => async ({
    getState,
    setState,
    dispatch
  }) => {
    console.group(`Fetch #${fetchCounter++}`)

    const params = { rover, camera, sol, page }

    if (page === FIRST_PAGE) {
      debug('Fetching photos...', params)
    }

    setState(draft => {
      draft.isLoading = true
    })

    try {
      const response = await mars.photos.read(params)
      debug(`Photos for page ${page} fetched from NASA`)

      if (response.photos.length) {
        debug(`Loading ${response.photos.length} photos in background...`)

        const localPhotos = []
        const onPhotoLoad = () => dispatch(actions.incrementLoadedPhotos())

        response.photos.forEach(photo => {
          const photoElement = new window.Image()
          photoElement.onload = onPhotoLoad
          photoElement.src = photo.img_src
          localPhotos.push(photo.img_src)
        })

        setState(draft => {
          draft.photos = getState().photos.concat(localPhotos)
        })

        if (response.photos.length === MAX_PHOTOS_PER_PAGE) {
          if (page < MAX_PAGES) {
            debug('We need to go deeper. Making another call for photos...')
            console.groupEnd()

            dispatch(
              actions.fetchPhotos({ rover, camera, sol, page: page + 1 })
            )
          } else {
            debug(`Maxium amount of ${MAX_PAGES} pages reached. Stop.`)

            dispatch(actions.endFetch())
          }
        } else {
          debug(`No more photos. Last page: ${page}`)
          console.groupEnd()

          dispatch(actions.endFetch())
        }
      } else {
        debug('No photos.')
        console.groupEnd()

        dispatch(actions.endFetch())
      }
    } catch (e) {
      setState(draft => {
        draft.isLoading = false
        draft.error = e.message
      })
    }
  },
  incrementLoadedPhotos: () => ({ getState, setState }) => {
    const { photosLoaded, photos } = getState()

    setState(draft => {
      draft.photosLoaded++
      draft.progress = (photosLoaded + 1) / photos.length
    })
  },
  endFetch: () => ({ setState }) => {
    setState(draft => {
      draft.isLoading = false
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
