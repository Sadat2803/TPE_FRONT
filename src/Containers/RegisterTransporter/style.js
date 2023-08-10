import styled from 'styled-components'

export const CustomInput = styled.input`
	border: none;
	font-family: 'Montserrat';
	padding: 1rem;
	border-radius: 0.3rem;
	width: ${(props) => props.width || 'unset'};
`
export default {
	normal: {
		borderBottom: 'none',
	},
	hover: {
		borderBottom: ' 4px solid #50F5A9',
	},
}
