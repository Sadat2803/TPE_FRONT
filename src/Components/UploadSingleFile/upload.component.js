import React, { useEffect, useState } from 'react'

import File from '../../assets/img/file@2x.png'
import { FileInputContainer } from '../../Containers/PasserCommande/PasserCommande.styles'
import { uploadSingleFile } from '../../api/upload'

function UploadFile({ name, onFile, accept = '' }) {
	const [file, setFile] = useState(null)

	useEffect(() => {
		async function uploadFile() {
			const res = await uploadSingleFile(file)
			onFile(res.data)
		}

		if (file) {
			uploadFile()
		}
	}, [file])

	return (
		<div
			style={{
				display: 'flex',
				flex: 1,
				borderRadius: '0.5rem',
				background: 'white',
				alignItems: 'center',
				justifyContent: 'space-between',
				marginBottom: '1rem',
				position: 'relative',
			}}
		>
			{file && (
				<img
					src={File}
					style={{
						height: 20,
						marginLeft: '1rem',
						marginRight: '1rem',
					}}
					alt=''
				/>
			)}
			<span
				style={{
					width: '100%',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{file && file.name}
			</span>
			<FileInputContainer>
				<input
					type='file'
					id={name}
					name={name}
					className='file'
					accept={accept}
					onChange={(e) => {
						  const fileType = e.target.files[0]?.type?.split('/')[1];
						  if (accept.includes(fileType)){
							  setFile(e.target.files[0])
						  } else {
							alert(`Désolé, le fichier que vous avez essayé de télécharger n'est pas pris en charge. Veuillez choisir un format de fichier valide. `)
						  }
					}}
				/>
				<label htmlFor={name}>Télécharger</label>
			</FileInputContainer>
		</div>
	)
}
export default UploadFile
