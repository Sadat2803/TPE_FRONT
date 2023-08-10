import React, { useState } from 'react'

import { PUBLIC } from '../../api/base'
import UploadFile from '../UploadSingleFile/upload.component'

function UploadMultipleFiles({ name, initialFiles = [], onChange }) {
	const [files, setFiles] = useState(initialFiles)

	return (
		<div>
			<UploadFile
				name={name}
				accept='.jpg, .png'
				onFile={(file) => {
					setFiles([...files, file])
					onChange([...files, file])
				}}
			/>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '500px',
					flexWrap: 'wrap',
				}}
			>
				{files.map((file, index) => (
					<div
						key={String(index)}
						style={{
							display: 'flex',
							flexDirection: 'column',
							//alignItems: 'center',
							justifyContent: 'flex-start',
							marginBottom: '1rem',
							marginRight: '1rem',
							width: 100,
						}}
					>
						<img
							style={{
								width: 100,
								height: 100,
								borderRadius: 5,
								objectFit: 'cover',
								marginBottom: '1rem',
							}}
							src={`${PUBLIC}/${file?.name}`}
							alt=''
						/>
						<button
							type='button'
							onClick={() => {
								setFiles(
									files.filter((f) => f.name !== file.name)
								)
								onChange(
									files.filter((f) => f.name !== file.name)
								)
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
		</div>
	)
}

export default React.memo(UploadMultipleFiles)
