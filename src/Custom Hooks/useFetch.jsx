import { useState } from "react"

export const useFetch = () => {

    const [result, setResult] = useState();

    const fetchApi = (URL) => {

        fetch(URL, {
            method: 'GET',
            headers: {
                Authorization: "Bearer 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"
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.message)
                    alert(data.message)
                else {
                    setResult(data)
                }
            })

    }

    return [result, fetchApi]
}