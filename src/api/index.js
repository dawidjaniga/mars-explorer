import ky from 'ky'
import { nanoid } from 'nanoid'

const prefixUrl = process.env.API_URL || 'http://localhost:3001'
const client = ky.create({ prefixUrl })

const api = {
  tasks: {
    create: async data => {
      await client.post('tasks', {
        json: {
          ...data,
          id: nanoid(),
          checked: false
        }
      })
    },
    read: (id = '') => {
      return client.get(`tasks/${id}`).json()
    }
  }
}

export default api
