import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

    // Resetting the error state each time we send a new request.
    // Also, ALWAYS RETURN THE REQUEST, otherwise the app will get stuck.
    const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null)
      return req
    });

    // Setting an interceptor to
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
      setError(err)
    });

    useEffect(() => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return [error, errorConfirmedHandler];
}
