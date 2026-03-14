import { useAppContext } from '@/context/AppContext.jsx'
import { useApiQuery } from '../../core'
import { MESSAGES } from '@/constants/messages.js'

const defaultDashboard = {
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
    recentComments: []
}

export function useAdminDashboard() {
    const { axios } = useAppContext()

    const { data, loading, error, refetch } = useApiQuery(
        () => axios.get('/api/admin/dashboard'),
        {
            errorMessage: MESSAGES.ERROR_GENERIC
        }
    )

    return {
        dashboardData: data?.dashboardData || defaultDashboard,
        loading,
        error,
        refetch
    }
}
