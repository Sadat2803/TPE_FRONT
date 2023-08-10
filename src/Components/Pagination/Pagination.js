import React from 'react'
import { createUltimatePagination, ITEM_TYPES } from 'react-ultimate-pagination'

const activePageStyle = { fontWeight: 'bold' }

const Page = ({ value, isActive, onClick, isDisabled }) => (
	<button
		style={
			isActive
				? {
						background: '#03D5FC',
						color: 'white',
						border: '1px solid #03D5FC',
						padding: '0.4rem .7rem',
						textAlign: 'center',
						marginLeft: '0.2rem',
						marginRight: '0.2rem',
						fontFamily: 'Montserrat',
				  }
				: {
						background: 'white',
						color: '#E4EAF0',
						border: '1px solid #E4EAF0',
						padding: '0.4rem .7rem',
						textAlign: 'center',
						marginLeft: '0.2rem',
						marginRight: '0.2rem',
						fontFamily: 'Montserrat',
				  }
		}
		onClick={onClick}
		disabled={isDisabled}
	>
		{value}
	</button>
)

const Ellipsis = ({ onClick, isDisabled }) => (
	<button onClick={onClick} disabled={isDisabled}>
		...
	</button>
)

const FirstPageLink = ({ isActive, onClick, isDisabled }) => (
	<button
		style={{
			background: '#E4EAF0',
			padding: '0.4rem .7rem',
			marginLeft: '0.2rem',
			marginRight: '0.2rem',
			border: '1px solid #E4EAF0',
		}}
		onClick={onClick}
		disabled={isDisabled}
	>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='11.749'
			height='11.377'
			viewBox='0 0 11.749 11.377'
		>
			<g
				id='Group_11288'
				data-name='Group 11288'
				transform='translate(-12.955 -14.907)'
			>
				<path
					id='Path_11654'
					data-name='Path 11654'
					d='M0,5.158,5.158,0l5.159,5.158'
					transform='translate(19.016 25.754) rotate(-90)'
					fill='none'
					stroke='#fff'
					strokeWidth='1.5'
				/>
				<path
					id='Path_11655'
					data-name='Path 11655'
					d='M0,5.158,5.158,0l5.159,5.158'
					transform='translate(14.016 25.754) rotate(-90)'
					fill='none'
					stroke='#fff'
					strokeWidth='1.5'
				/>
			</g>
		</svg>
	</button>
)

const PreviousPageLink = ({ isActive, onClick, isDisabled }) => (
	<button
		style={{
			background: '#E4EAF0',
			padding: '0.4rem .7rem',
			marginLeft: '0.2rem',
			marginRight: '0.2rem',
			border: '1px solid #E4EAF0',
		}}
		onClick={onClick}
		disabled={isDisabled}
	>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='6.749'
			height='11.377'
			viewBox='0 0 6.749 11.377'
		>
			<path
				id='Path_16'
				data-name='Path 16'
				d='M0,5.158,5.158,0l5.159,5.158'
				transform='translate(1.061 10.847) rotate(-90)'
				fill='none'
				stroke='#fff'
				strokeWidth='1.5'
			/>
		</svg>
	</button>
)

const NextPageLink = ({ isActive, onClick, isDisabled }) => (
	<button
		style={{
			background: '#E4EAF0',
			padding: '0.4rem .7rem',
			marginLeft: '0.2rem',
			marginRight: '0.2rem',
			border: '1px solid #E4EAF0',
		}}
		onClick={onClick}
		disabled={isDisabled}
	>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='6.749'
			height='11.377'
			viewBox='0 0 6.749 11.377'
		>
			<path
				id='Path_17'
				data-name='Path 17'
				d='M0,5.158,5.158,0l5.159,5.158'
				transform='translate(5.689 0.53) rotate(90)'
				fill='none'
				stroke='#fff'
				strokeWidth='1.5'
			/>
		</svg>
	</button>
)

const LastPageLink = ({ isActive, onClick, isDisabled }) => (
	<button
		style={{
			background: '#E4EAF0',
			padding: '0.4rem .7rem',
			marginLeft: '0.2rem',
			marginRight: '0.2rem',
			border: '1px solid #E4EAF0',
		}}
		onClick={onClick}
		disabled={isDisabled}
	>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='11.749'
			height='11.377'
			viewBox='0 0 11.749 11.377'
		>
			<g
				id='Group_11287'
				data-name='Group 11287'
				transform='translate(-385.296 -15.716)'
			>
				<path
					id='Path_11652'
					data-name='Path 11652'
					d='M0,5.158,5.158,0l5.159,5.158'
					transform='translate(390.984 16.246) rotate(90)'
					fill='none'
					stroke='#fff'
					strokeWidth='1.5'
				/>
				<path
					id='Path_11653'
					data-name='Path 11653'
					d='M0,5.158,5.158,0l5.159,5.158'
					transform='translate(395.984 16.246) rotate(90)'
					fill='none'
					stroke='#fff'
					strokeWidth='1.5'
				/>
			</g>
		</svg>
	</button>
)

const itemTypeToComponent = {
	[ITEM_TYPES.PAGE]: Page,
	[ITEM_TYPES.ELLIPSIS]: Ellipsis,
	[ITEM_TYPES.FIRST_PAGE_LINK]: FirstPageLink,
	[ITEM_TYPES.PREVIOUS_PAGE_LINK]: PreviousPageLink,
	[ITEM_TYPES.NEXT_PAGE_LINK]: NextPageLink,
	[ITEM_TYPES.LAST_PAGE_LINK]: LastPageLink,
}

const UltimatePaginationBasic = createUltimatePagination({
	itemTypeToComponent,
})

export default UltimatePaginationBasic
