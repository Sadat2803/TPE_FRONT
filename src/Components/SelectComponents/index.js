import React from 'react'
import Select, { components } from 'react-select'

const IconValueContainer = ({ children, ...props }) => {
	const { getValue, hasValue } = props
	const nbValues = getValue().length
	if (!hasValue) {
		return (
			<components.ValueContainer {...props}>
				{children}
			</components.ValueContainer>
		)
	}
	return <components.ValueContainer {...props}></components.ValueContainer>
}

const IconControl = ({ children, ...props }) => {
	const value = props.getValue()?.pop()?.value

	console.log(children)

	return (
		<components.Control {...props}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					//height: '1.5rem',
					marginLeft: '.5rem',
				}}
			>
				{Array(parseInt(value || 0))
					.fill()
					.map((e, i) => (
						<svg
							key={String(i)}
							xmlns='http://www.w3.org/2000/svg'
							width='13.605'
							height='27.839'
							viewBox='0 0 13.605 27.839'
							style={{
								marginRight: '.5rem',
							}}
						>
							<g id='user' transform='translate(0.5 0.5)'>
								<path
									id='Path_11624'
									d='M31.488,8.816A3.412,3.412,0,1,1,34.9,5.4,3.412,3.412,0,0,1,31.488,8.816Zm0-6.054a2.645,2.645,0,1,0,2.645,2.645A2.645,2.645,0,0,0,31.488,2.762Z'
									transform='translate(-25.195 -1.992)'
									fill='#51c7f2'
									stroke='#51c7f2'
									strokeWidth='1'
								/>
								<path
									id='Path_11625'
									d='M30.917,33.11h-.752a.383.383,0,1,1,0-.767h.752A1.484,1.484,0,0,0,32.4,30.861V24.829a1.7,1.7,0,0,0-1.7-1.7H23.03a1.7,1.7,0,0,0-1.7,1.7v6.034a1.484,1.484,0,0,0,1.484,1.481h.725a.383.383,0,1,1,0,.767h-.725a2.252,2.252,0,0,1-2.249-2.249V24.829A2.472,2.472,0,0,1,23.03,22.36H30.7a2.472,2.472,0,0,1,2.469,2.469v6.034A2.252,2.252,0,0,1,30.917,33.11Z'
									transform='translate(-20.562 -14.552)'
									fill='#51c7f2'
									stroke='#51c7f2'
									strokeWidth='1'
								/>
								<path
									id='Path_11626'
									d='M38.027,48.646A2.029,2.029,0,0,1,36,46.619V40.231a.383.383,0,0,1,.767,0v6.388a1.26,1.26,0,0,0,2.52,0V34.509a.383.383,0,0,1,.767,0v12.11A2.029,2.029,0,0,1,38.027,48.646Z'
									transform='translate(-30.081 -21.807)'
									fill='#51c7f2'
									stroke='#51c7f2'
									strokeWidth='1'
								/>
								<path
									id='Path_11627'
									d='M29.453,48.646a2.029,2.029,0,0,1-2.027-2.027V34.509a.383.383,0,0,1,.767,0v12.11a1.26,1.26,0,0,0,2.52,0V40.231a.383.383,0,0,1,.767,0v6.388A2.029,2.029,0,0,1,29.453,48.646Z'
									transform='translate(-24.794 -21.807)'
									fill='#51c7f2'
									stroke='#51c7f2'
									strokeWidth='1'
								/>
							</g>
						</svg>
					))}
			</div>
			{children}
		</components.Control>
	)
}

const IconOption = (props) => {
	const color = props.isSelected ? '#fff' : '#51c7f2'

	return (
		<components.Option {...props}>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					height: '1.5rem',
				}}
			>
				{Array(parseInt(props.data.value))
					.fill()
					.map((e, i) => (
						<svg
							key={String(i)}
							xmlns='http://www.w3.org/2000/svg'
							width='13.605'
							height='27.839'
							viewBox='0 0 13.605 27.839'
							style={{
								marginRight: '.5rem',
							}}
						>
							<g id='user' transform='translate(0.5 0.5)'>
								<path
									id='Path_11624'
									d='M31.488,8.816A3.412,3.412,0,1,1,34.9,5.4,3.412,3.412,0,0,1,31.488,8.816Zm0-6.054a2.645,2.645,0,1,0,2.645,2.645A2.645,2.645,0,0,0,31.488,2.762Z'
									transform='translate(-25.195 -1.992)'
									fill={color}
									stroke={color}
									strokeWidth='1'
								/>
								<path
									id='Path_11625'
									d='M30.917,33.11h-.752a.383.383,0,1,1,0-.767h.752A1.484,1.484,0,0,0,32.4,30.861V24.829a1.7,1.7,0,0,0-1.7-1.7H23.03a1.7,1.7,0,0,0-1.7,1.7v6.034a1.484,1.484,0,0,0,1.484,1.481h.725a.383.383,0,1,1,0,.767h-.725a2.252,2.252,0,0,1-2.249-2.249V24.829A2.472,2.472,0,0,1,23.03,22.36H30.7a2.472,2.472,0,0,1,2.469,2.469v6.034A2.252,2.252,0,0,1,30.917,33.11Z'
									transform='translate(-20.562 -14.552)'
									fill={color}
									stroke={color}
									strokeWidth='1'
								/>
								<path
									id='Path_11626'
									d='M38.027,48.646A2.029,2.029,0,0,1,36,46.619V40.231a.383.383,0,0,1,.767,0v6.388a1.26,1.26,0,0,0,2.52,0V34.509a.383.383,0,0,1,.767,0v12.11A2.029,2.029,0,0,1,38.027,48.646Z'
									transform='translate(-30.081 -21.807)'
									fill={color}
									stroke={color}
									strokeWidth='1'
								/>
								<path
									id='Path_11627'
									d='M29.453,48.646a2.029,2.029,0,0,1-2.027-2.027V34.509a.383.383,0,0,1,.767,0v12.11a1.26,1.26,0,0,0,2.52,0V40.231a.383.383,0,0,1,.767,0v6.388A2.029,2.029,0,0,1,29.453,48.646Z'
									transform='translate(-24.794 -21.807)'
									fill={color}
									stroke={color}
									strokeWidth='1'
								/>
							</g>
						</svg>
					))}
			</div>
		</components.Option>
	)
}

export { IconOption, IconControl, IconValueContainer }
