export const apiClient = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: object,
  headers?: HeadersInit
): Promise<
  | T
  | {
      error: boolean
      status: number
      message: string
    }
> => {
  const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    return {
      error: true,
      status: res.status,
      message: res.statusText,
    }
  }

  return res.json()
}
