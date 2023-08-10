import React, { useState } from 'react'

import File from '../../assets/img/file@2x.png'
import UploadFile from '../UploadSingleFile/upload.component'

function UploadFileCommande({ name, onChange, initialFiles = [] }) {
	const [files, setFiles] = useState(initialFiles)

	return (
		<div>
			<UploadFile
				name={name}
				onFile={(file) => {
					setFiles([...files, file])
					onChange([...files, file])
				}}
			/>

			{files.map((file, index) => (
				<div
					key={String(index)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start',
						marginBottom: 20,
					}}
				>
					<img
						src={File}
						style={{
							height: 20,
							marginRight: '1rem',
						}}
						alt=''
					/>
					<span
						style={{
							marginRight: '1rem',
							width: '10rem',
						}}
					>
						{file?.name}
					</span>
					<button
						onClick={() => {
							setFiles(files.filter((f) => f.name !== file.name))
							onChange(files.filter((f) => f.name !== file.name))
						}}
						style={{
							color: 'white',
							border: 'none',
							backgroundColor: '#51C7F2',
							padding: '0.5rem 1rem',
							fontFamily: 'Montserrat',
							borderRadius: '0.5rem',
							cursor: 'pointer',
						}}
					>
						Supprimer
					</button>
				</div>
			))}
		</div>
	)
}

export default React.memo(UploadFileCommande)
