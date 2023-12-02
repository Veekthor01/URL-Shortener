const baseURL = process.env.BACKEND_URL;

export default async function createShortUrl (long_url, custom_url) {
    const url = `${baseURL}/url`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            long_url,
            custom_url,
        }),
    };
    // Send a POST request to the server with the long_url and custom_url
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.error);
          }
        const data = await response.json();
        return data.short_url;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
