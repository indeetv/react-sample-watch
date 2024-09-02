export class myFetch {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_BASE_URL || '';
        if (!this.baseUrl) {
            throw new Error('Base URL is not defined in the environment variables.');
        }
    }

    async get<T>(endpoint: string, headers?: HeadersInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: {
                    ...headers,
                },
            });
            return this.handleResponse<T>(response);
        } catch (error) {
            console.error('Fetch GET error:', error);
            throw error;
        }
    }

    async post<T>(endpoint: string, data: any, headers?: HeadersInit): Promise<T> {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: JSON.stringify(data),
            });
            return this.handleResponse<T>(response);
        } catch (error) {
            console.error('Fetch POST error:', error);
            throw error;
        }
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
        }
        return response.json() as Promise<T>;
    }
}

// Example usage:
// const api = new myFetch();

// // GET request with custom headers
// api.get('/posts', { Authorization: 'Bearer your_token_here' })
//     .then(data => console.log(data))
//     .catch(error => console.error('Error fetching posts:', error));

// // POST request with custom headers
// api.post('/posts', { title: 'New Post', body: 'This is a new post.' }, { Authorization: 'Bearer your_token_here' })
//     .then(data => console.log('Post created:', data))
//     .catch(error => console.error('Error creating post:', error));
