import api from './base'

export const getDistanceBetweenTwoPlaces = async (origin, destination) => {
	const res = await api.get(
		`/distance?origin=${origin}&destination=${destination}`
	)

	const rows = res.data.rows

	const result = rows[0].elements[0].distance

	return result.value
}
