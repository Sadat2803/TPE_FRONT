import { useRef, useEffect } from 'react'

export const useOptimizedComponentWillMount = (callback) => {
	const mounted = useRef(false)
	if (!mounted.current) callback()

	useEffect(() => {
		mounted.current = true
	}, [])
}
