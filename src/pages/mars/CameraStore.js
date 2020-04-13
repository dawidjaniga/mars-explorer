import mars from 'api/mars'
import { createHook, createContainer, createStore } from 'react-sweet-state'

const initialState = {
  photos: [],
  photosLoaded: 0,
  page: 1,
  isLoading: true
}

const actions = {
  reset: () => ({ setState }) => {
    setState(draft => initialState)
  },
  fetchPhotos: ({ rover, camera, sol }) => async ({
    getState,
    setState,
    dispatch
  }) => {
    setState(draft => {
      draft.isLoading = true
      // draft.photosLoaded = 0
    })

    const { page, photos } = getState()
    const response = await mars.images.read({
      rover,
      camera,
      sol,
      page: page
    })

    if (response.photos.length) {
      const localPhotos = []

      response.photos.forEach(photo => {
        localPhotos.push(photo.img_src)
      })

      setState(draft => {
        draft.isLoading = false
        draft.photos = photos.concat(localPhotos)
      })

      if (response.photos.length === 25) {
        console.log('Loading next page')
        const nextPage = page + 1
        dispatch(actions.setPage(nextPage))

        if (nextPage < 10) {
          dispatch(actions.fetchPhotos({ rover, camera, sol }))
        } else {
          console.log('Load finished')
        }
      }
    }
  },
  setPage: page => ({ getState, setState }) => {
    setState(draft => {
      draft.page = page
    })
  },
  addCameraImageLoaded: () => ({ getState, setState }) => {
    console.log('CameraStore: image loaded')
    // setState(draft => {
    //   const { loaded, photos } = draft.cameras[sol][camera]
    //   draft.cameras[sol][camera].loaded++
    //   draft.cameras[sol][camera].progress = (loaded + 1) / photos.length
    // })
  }
}

const Store = createStore({
  initialState,
  actions,
  name: 'Camera'
})

export const useCameraStore = createHook(Store)
export const CameraContainer = createContainer(Store)
