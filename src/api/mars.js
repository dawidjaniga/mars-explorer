import ky from 'ky'
import qs from 'qs'

const client = ky.create({
  prefixUrl: 'https://api.nasa.gov/mars-photos/api/v1/rovers'
})

const createUrl = ({ rover, ...params }) =>
  `${rover}/photos?${qs.stringify({
    api_key: process.env.REACT_APP_MARS_API_KEY,
    ...params
  })}`

const api = {
  photos: {
    read: ({ rover, camera, sol, page }) =>
      client
        .get(
          createUrl({
            rover,
            camera,
            sol,
            page
          })
        )
        .json()
  }
}

export default api
