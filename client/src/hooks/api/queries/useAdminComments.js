import { useAppContext } from '@/context/AppContext.jsx'
import { useApiQuery } from '../../core'
import { MESSAGES } from '@/constants/messages.js'

export function useAdminComments() {
    const { axios } = useAppContext()

    const { data, loading, error, refetch } = useApiQuery(
        () => axios.get('/api/admin/comments'),
        {
            errorMessage: MESSAGES.ERROR_FETCH_COMMENTS
        }
    )

    return {
        comments: data?.comments || [],
        loading,
        error,
        refetch
    }
}
