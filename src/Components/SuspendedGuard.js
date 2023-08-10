import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { getUser } from '../api/auth'
import { setSuspendu, updateProfile } from '../redux/auth'

function SuspendedGuard() {
	const dispatch = useDispatch()
	const { pathname } = useLocation()
	const user = useSelector((state) => state.auth.user)

	async function checkSuspended(id) {
		const user = await getUser(id)
		dispatch(setSuspendu(user.suspendre))
		dispatch(updateProfile(user))
	}

	useEffect(() => {
		if (user) {
			checkSuspended(user._id)
		}
	}, [pathname])

	return null
}

export default SuspendedGuard
