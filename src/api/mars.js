import ky from 'ky'

const client = ky.create({
  prefixUrl: 'https://api.nasa.gov/mars-photos/api/v1/rovers'
})
const apiKey = 'GttlntRqZ8uDu1wQfKJHuAXI8BiUOs9qWzjWaxBY'

const api = {
  images: {
    read: ({ sol, rover, page }) =>
      client
        .get(`${rover}/photos?api_key=${apiKey}&sol=${sol}&page=${page}`)
        .json()
  }
}

export default api
