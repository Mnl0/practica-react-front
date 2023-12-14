import { useEffect } from 'react';
function UseFetch(url, seteo, dependencia) {
	useEffect(() => {
		fetch(url)
			.then(response => response.json())
			.then(data => seteo(data))
			.catch(error => console.log(error))

	}, [dependencia])
	return () => {
		seteo([])
	}
}
export default UseFetch;