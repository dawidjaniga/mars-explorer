import mars from 'api/mars'
import { createHook, createStore } from 'react-sweet-state'

const initialState = {
  cameras: {},
  sol: 62,
  maxSol: 100,
  currentPhotosPage: 1,
  totalPhotos: 0,
  rover: 'curiosity',
  isLoading: true
}

const actions = {
  load: () => async ({ getState, setState, dispatch }) => {
    setState(draft => {
      draft.isLoading = true
    })

    const { cameras, rover, sol, currentPhotosPage } = getState()
    const { photos } = await mars.images.read({
      rover,
      sol,
      page: currentPhotosPage
    })

    if (!cameras[sol]) {
      setState(draft => {
        draft.cameras[sol] = {}
      })
    }

    if (photos.length) {
      const localCameras = {}

      photos.forEach(photo => {
        if (!localCameras[photo.camera.name]) {
          localCameras[photo.camera.name] = []
        }

        localCameras[photo.camera.name].push(photo)
      })

      Object.entries(localCameras).forEach(([camera, photos]) => {
        if (!getState().cameras[sol][camera]) {
          dispatch(actions.addCamera(camera, sol))
        }

        dispatch(actions.addPhotos(camera, sol, photos))
      })

      setState(draft => {
        draft.maxSol = photos[0].rover.max_sol
        draft.totalPhotos = photos[0].rover.total_photos
        draft.isLoading = false
      })

      if (false || photos.length === 25) {
        console.log('Loading next page')
        const nextPage = currentPhotosPage + 1
        dispatch(actions.setPage(nextPage))

        if (nextPage < 4) {
          dispatch(actions.load())
        } else {
          console.log('Load finished')
        }
      }
    }
  },
  addCamera: (camera, sol) => ({ getState, setState }) => {
    setState(draft => {
      draft.cameras[sol][camera] = {
        photos: [],
        loaded: 0,
        progress: 0
      }
    })
  },
  addPhotos: (camera, sol, photos) => ({ getState, setState }) => {
    setState(draft => {
      draft.cameras[sol][camera].photos.push(...photos)
    })
  },
  setRover: rover => ({ getState, setState }) => {
    setState(draft => {
      draft.rover = rover
    })
  },
  setSol: sol => ({ getState, setState }) => {
    setState(draft => {
      draft.sol = sol
    })
  },
  setPage: page => ({ getState, setState }) => {
    setState(draft => {
      draft.currentPhotosPage = page
    })
  },
  addCameraImageLoaded: camera => ({ getState, setState }) => {
    setState(draft => {
      const { sol } = getState()
      const { loaded, photos } = draft.cameras[sol][camera]
      draft.cameras[sol][camera].loaded++
      draft.cameras[sol][camera].progress = (loaded + 1) / photos.length
    })
  }
}

const MarsStore = createStore({
  initialState,
  actions
})

export const useMarsStore = createHook(MarsStore)
