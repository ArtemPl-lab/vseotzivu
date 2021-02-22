import {useState, useCallback} from 'react';

export const useAPI = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async ( url, method = 'GET', body = null, headers = {}) => {
        setLoading(true);
        try{
            headers['Content-Type'] = 'application/json';
            const response = await fetch(url, {
                method,
                body,
                headers
            });
            const data = await response.json();
            setLoading(false);
            return data;
        } catch(e){
            setLoading(false);
            setError(e.message);
        }
    }, []);
    return { loading, error, request };
}