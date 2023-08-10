import styled from 'styled-components'

export const GradientText = styled.span`
	font-size: ${(props) => props.size || '3rem'};
	text-align: ${(props) => props.textAlign || 'unset'};
	font-family: Montserrat;
	font-style: italic;
	font-weight: bold;
	background: linear-gradient(90deg, #60d2f8 0%, #82f0b1 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	margin-top: ${(props) => props.marginTop || '2rem'};
`

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	font-family: Montserrat;
	background-color: 'red';
	position: relative;
`

export const SubText = styled.span`
	font-family: Montserrat;
	color: #262626;
	margin-top: 1rem;
	font-size: small;
`
export const StyledForm = styled.form`
	width: 65%;
	background-color: 'red';
	padding-bottom: 1rem;
`

export const FormContentSection = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 1rem;
	//overflow-y: scroll;
	//height: calc(100vh - 7rem);
`

export const SubmitButton = styled.button`
	background: #50f5a9;
	border: none;
	padding: 1rem 4rem;
	color: white;
	border-radius: 0.5rem;
	font-size: 1rem;
	margin-top: 1rem;
	cursor: pointer;
	font-family: Montserrat;
	font-weight: bold;
`

export const SubmitButtonContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-bottom: 2rem;
`

export const FormSectionTitle = styled.div`
	margin-bottom: 1rem;
	color: #72c5ed;
	font-size: 1.8rem;
	font-weight: bold;
`

export const FormSectionCard = styled.div`
	background: #e5eaef;
	display: flex;
	flex-direction: column;
	padding: 2rem;
	box-shadow: 0 3px 11px -3px rgba(0, 0, 0, 0.2);
	border-radius: 1rem;
	color: #858ea8;
	margin-top: 1rem;
	position: relative;
`

export const StyledInput = styled.input`
	display: flex;
	flex: 1;
	border-radius: 0.5rem;
	border: none;
	padding: 1rem;
	font-family: Montserrat;
	color: #858ea8;
`

export const StyledTextArea = styled.textarea`
	display: flex;
	flex: 1;
	border-radius: 0.5rem;
	border: none;
	padding: 1rem;
	font-family: Montserrat;
	height: 400px;
`

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	margin-bottom: 1rem;
`

export const Select = styled.select`
	background-color: 'white';
	color: white;
	padding: 1rem;
	width: ${(props) => props.width || '100%'};
	border: none;
	border-radius: 0.5rem;
	outline: none;
	font-family: Montserrat;
	color: #838eab;

	/* styling */
	background-color: white;
	//border: thin solid blue;
	border-radius: 0.5rem;
	display: inline-block;
	font: inherit;
	//line-height: 1.5em;
	padding: 1em 3.5em 1em 2em;

	/* reset */

	margin: 0;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
	-webkit-appearance: none;
	-moz-appearance: none;

	background-image: linear-gradient(45deg, transparent 50%, gray 50%),
		linear-gradient(135deg, gray 50%, transparent 50%),
		linear-gradient(to right, #ccc, #ccc);
	background-position: calc(100% - 20px) calc(1em + 2px),
		calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
	background-size: 5px 5px, 5px 5px, 1px 1.5em;
	background-repeat: no-repeat;
`

export const FileInputContainer = styled.div`
	justify-content: flex-end;

	& > label {
		display: block;
		position: relative;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
		border-radius: 0.5rem;
		background: #50f5a9;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: bold;
		cursor: pointer;
		font-size: small;
		transition: transform 0.2s ease-out;
	}

	& > input {
		opacity: 0;
		width: 0.1px;
		height: 0.1px;
		position: absolute;
	}
`

export const Seperator = styled.span`
	width: 100%;
	height: 1px;
	margin-top: 0.5rem;
	margin-bottom: 1rem;
	border-top: 1px solid #707070;
	opacity: 0.3;
`
