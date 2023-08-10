import { Document, Page, pdfjs } from 'react-pdf'
import { GradientText, Wrapper } from '../PasserCommande/PasserCommande.styles'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import Container from '../../Components/LayoutClient/container.component'
import { BASE_URL, PUBLIC } from '../../api/base'
import { useSelector } from 'react-redux'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function PayCommande(props) {
	const { id } = useParams()
    const history = useHistory();
	const user = useSelector((state) => state.auth.user)

	return (
		<Container>
			<Wrapper>
				<GradientText>{'Paiement'.toUpperCase()}</GradientText>
				<div
					style={{
						height: 'calc(100vh - 20rem)',
						overflow: 'auto',
						border: '2px dashed #000',
						marginTop: '1rem',
					}}
				>
					<Document file={`${PUBLIC}/${id}.pdf`} loading={null}>
						<Page pageNumber={1} />
					</Document>
				</div>
				{user?.premium ? (
					<button
						onClick={() => {
							history.push(`/commandes/list`)
						}}
						style={{
							padding: '1rem 6rem',
							marginTop: '1rem',
							borderRadius: 5,
							cursor: 'pointer',
							color: 'white',
							marginRight: '1rem',
							background: '#50F5A9',
							border: 'none',
							fontSize: 20,
							fontFamily: 'Montserrat',
						}}
					>
						Valider
					</button>
				) : (
					<form action={`${BASE_URL}/tarif/pay`} method='POST'>
						<input type="text" hidden={true} name="commandeId" value={id} />
						<button role="link" type='submit' 
						   style={{
							padding: '1rem 6rem',
							marginTop: '1rem',
							borderRadius: 5,
							cursor: 'pointer',
							color: 'white',
							marginRight: '1rem',
							background: '#50F5A9',
							border: 'none',
							fontSize: 20,
							fontFamily: 'Montserrat',
						}}>Payer</button>
					</form>
				)}
			</Wrapper>
		</Container>
	)
}

export default PayCommande
