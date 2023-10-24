export default async function createShortUrl (long_url, custom_url) {
    const url = 'http://localhost:5000/url';
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
