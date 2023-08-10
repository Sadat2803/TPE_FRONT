import React from 'react'

function MenuItem({ title, icon, onClick = () => {}, subMenu = null }) {
	return (
		<div
			style={{
				width: '100%',
				marginBottom: '0.5rem',
			}}
		>
			<div
				onClick={onClick}
				style={{
					width: '100%',
					background: '#413F4D',
					height: '3rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'start',
					cursor: 'pointer',
					paddingLeft: '1rem',
				}}
			>
				<div style={{ marginRight: '1rem' }}>{icon}</div>
				<span
					style={{
						color: 'white',
						fontFamily: 'Montserrat',
						fontSize: '0.8rem',
					}}
				>
					{title}
				</span>
			</div>

			{subMenu && subMenu}
		</div>
	)
}

export default MenuItem
