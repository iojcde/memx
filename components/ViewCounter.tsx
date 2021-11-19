import React, { useEffect } from 'react'
import useSWR from 'swr'

import fetcher from 'lib/fetcher'
import { Views } from 'lib/types'

const ViewCounter: React.FC<{ slug: string, text?: string }> = ({ slug, text }) => {
    const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher)
    const views = new Number(data?.total)

    useEffect(() => {
        const registerView = () =>
            fetch(`/api/views/${slug}`, {
                method: `POST`,
            })
        if (process.env.NODE_ENV === `production`) {
            registerView()
        }
    }, [slug])
    return <span>{`${views > 0 ? views.toLocaleString() : `–––`}  ${text || 'views'}`}</span>

}
export default ViewCounter