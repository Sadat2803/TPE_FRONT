import { useHistory } from 'react-router-dom'

export default function Public() {
	const history = useHistory()

	history.push('/login')

	return null
}
