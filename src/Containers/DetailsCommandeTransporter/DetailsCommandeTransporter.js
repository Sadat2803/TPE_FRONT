import { GradientText, SubText } from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'

import CommandeForm from '../../Components/CommandeForm'
import LayoutTransporter from '../../Components/LayoutTransporter/LayoutTransporter'
import TransportTracking from '../../Components/TransportTracking/TransportTracking'
import { getCommande } from '../../api/commande'
import { useParams } from 'react-router'

function DetailsCommandeTransporter(props) {
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
		<LayoutTransporter>
			<div
				style={{
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					paddingTop: '2rem',
					paddingBottom: '4rem',
					fontFamily: 'Montserrat',
				}}
			>
				<GradientText>{`${'Détail COMMANDE'.toUpperCase()} ${!!commande ? ' N°' + commande.__id : '' }`}</GradientText>
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
							//showFacture
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
			</div>
		</LayoutTransporter>
	)
}

export default DetailsCommandeTransporter
