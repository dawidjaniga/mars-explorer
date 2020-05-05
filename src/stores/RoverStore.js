import mars from 'api/mars'
import { createHook, createContainer, createStore } from 'react-sweet-state'

const initialState = {
  maxSol: 0,
  totalPhotos: 0,
  landingDate: null,
  status: null,
  isLoading: true,
  fetched: false,
  error: null
}

const actions = {
  fetchDetails: ({ rover }) => async ({ getState, setState }) => {
    if (getState().fetched) {
      return
    }

    try {
      const { photos } = await mars.photos.read({
        rover,
        sol: 1
      })

      if (photos.length) {
        const { rover } = photos[0]

        setState(draft => {
          draft.maxSol = rover.max_sol
          draft.totalPhotos = rover.total_photos
          draft.landingDate = rover.landing_date
          draft.status = rover.status
          draft.fetched = true
          draft.isLoading = false
        })
      }
    } catch (e) {
      setState(draft => {
        draft.isLoading = false
        draft.error = e.message
      })
    }
  }
}

const RoverStore = createStore({
  initialState,
  actions,
  name: 'Rover'
})

export const useRoverStore = createHook(RoverStore)
export const RoverContainer = createContainer(RoverStore)
