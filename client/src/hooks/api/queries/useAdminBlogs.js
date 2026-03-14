import { useAppContext } from '@/context/AppContext.jsx'
import { useApiQuery } from '../../core'
import { MESSAGES } from '@/constants/messages.js'

export function useAdminBlogs() {
    const { axios } = useAppContext()

    const { data, loading, error, refetch } = useApiQuery(
        () => axios.get('/api/admin/blogs'),
        {
            errorMessage: MESSAGES.ERROR_FETCH_BLOGS
        }
    )

    return {
        blogs: data?.blogs || [],
        loading,
        error,
        refetch
    }
}
