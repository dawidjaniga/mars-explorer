import ky from 'ky'
import qs from 'qs'

const client = ky.create({
  prefixUrl: 'https://api.nasa.gov/mars-photos/api/v1/rovers'
})
const apiKey = 'GttlntRqZ8uDu1wQfKJHuAXI8BiUOs9qWzjWaxBY'

const createUrl = ({ rover, ...params }) =>
  `${rover}/photos?${qs.stringify({
    api_key: apiKey,
    ...params
  })}`

const api = {
  images: {
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
