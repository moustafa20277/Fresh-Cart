import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetch(Api , page) {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const currentPage = page?`?page=${page}`:``

  async function getData() {
    setLoading(true)
    try {
      const { data } = await axios.get(Api + currentPage)
      setList(data)
    } catch (error) {
      setError('There is a problem with the server.')      
    } finally {
      setLoading(null)
    }
  }
  useEffect(() => {
    getData()
  }, [page])




  return { error , loading , list  }
}