import {
	GradientText,
	SubText,
	Wrapper,
} from '../../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'

import CommandeForm from '../../../Components/CommandeForm'
import LayoutAdmin from '../../../Components/LayoutAdmin/LayoutAdmin'
import TransportTracking from '../../../Components/TransportTracking/TransportTracking'
import { getCommande } from '../../../api/commande'
import { useParams } from 'react-router'

function DetailCommandeAdmin() {
	const { id } = useParams()

	const [commande, setCommande] = useState(null)

	const onSubmit = async (data) => {}

	useEffect(() => {
		async function _getCommande(id) {
			const commande = await getCommande(id)
			setCommande(commande)
		}

		if (id) {
			_getCommande(id)
		}
	}, [id])

	return (
		<LayoutAdmin>
			<Wrapper>
				<GradientText>{`${'Détail COMMANDE'.toUpperCase()} ${!!commande ? 'N°' + commande.__id : '' }`}</GradientText>
				<SubText>
					Ici retrouver le détail complet du transport à effectuer
				</SubText>

				<div
					style={{
						width: '65%',
					}}
				>
					{commande?.waypoints_overage && (
						<TransportTracking
							display
							commande={commande}
							showFacture
						/>
					)}
				</div>

				{commande && (
					<CommandeForm
						hideSubmit
						disabled
						onSubmit={() => {}}
						preloadForm={true}
						preloadData={commande}
					/>
				)}
			</Wrapper>
		</LayoutAdmin>
	)
}

export default DetailCommandeAdmin
