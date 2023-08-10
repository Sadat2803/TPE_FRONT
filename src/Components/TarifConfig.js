import { getTarif } from '../api/tarif'
import { setTarif, setMiseADispo, seCourseACourse } from '../redux/tarif'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

function TarifConfig() {
	const dispatch = useDispatch()

	async function _getTarif() {
		const tarifMiseADispo = await getTarif("MISEADISPO");
		const tarifCourseACourse = await getTarif("COURSEACOURSE");
		const tarif = tarifMiseADispo;
		dispatch(setTarif(tarif))
		dispatch(setMiseADispo(tarifMiseADispo))
		dispatch(seCourseACourse(tarifCourseACourse))
	}

	useEffect(() => {
		_getTarif()
	}, [])

	return null
}

export default TarifConfig
