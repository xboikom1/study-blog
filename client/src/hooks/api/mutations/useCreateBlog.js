import { useAppContext } from '@/context/AppContext.jsx'
import { useApiMutation } from '../../core'
import { MESSAGES } from '@/constants/messages.js'
import toast from 'react-hot-toast'

export function useCreateBlog() {
    const { axios } = useAppContext()
    const { mutate, loading, error } = useApiMutation()

    const createBlog = async (blogData, imageFile) => {
        if (!imageFile || typeof imageFile === 'boolean') {
            toast.error(MESSAGES.ERROR_IMAGE_REQUIRED)
            return {
                success: false,
                message: MESSAGES.ERROR_IMAGE_REQUIRED
            }
        }

        const formData = new FormData()
        formData.append('blog', JSON.stringify(blogData))
        formData.append('image', imageFile)


        return mutate(
            () => axios.post('/api/blog/add', formData),
            {
                successMessage: MESSAGES.SUCCESS_BLOG_CREATED,
                errorMessage: MESSAGES.ERROR_CREATE_BLOG
            }
        )
    }

    return {
        createBlog,
        isCreating: loading,
        inProgress: loading,
        error
    }
}
