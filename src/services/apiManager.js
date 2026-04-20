class ApiManager {
    constructor(baseUrl = import.meta.env.VITE_API_BASE_URL || '') {
        this.baseUrl = baseUrl
    }

    async request(path, options = {}) {
        const url = `${this.baseUrl}${path}`
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
            ...options,
        })

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }

        return response.json()
    }

    get(path) {
        return this.request(path, { method: 'GET' })
    }

    post(path, body) {
        return this.request(path, {
            method: 'POST',
            body: JSON.stringify(body),
        })
    }
}

export const apiManager = new ApiManager()
export default ApiManager

