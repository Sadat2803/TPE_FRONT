import styled from 'styled-components'

export const RootContainer = styled.div`
	display: flex;
	flex-direction: column;
`

export const SideBar = styled.aside`
	display: flex;
	height: calc(100vh - 7rem);
	overflow-y: auto;
	/* w-52 h-screen bg-ghostWhite flex flex-col items-center p-4 relative justify-between */
`

export const SideBarContainer = styled.div`
	width: 250px;
	height: calc(100vh - 7rem);
	overflow-y: auto;
	background: #6f757a;
	display: flex;
	flex-direction: column;
	align-items: center;
	//justify-content: center;
	//padding: 10px;
	position: relative;
`

export const Header = styled.header`
	//lg:hidden w-full h-20 flex items-center justify-between px-4 bg-ghostWhite absolute top-0 z-10 border-b
	width: 100%;
	height: 7rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 1rem;
	padding-right: 1rem;
	background: #72c5ed;
`

export const Main = styled.div`
	/* flex-1 bg-ghostWhite w-full overflow-y-scroll mt-20 lg:mt-0 layout-shadow pb-10 lg:pb-0 */

	display: flex;
	flex-direction: column;
	flex: 1;
	background: red;
	width: 100%;
	overflow-y: scroll;
	//margin-top: 20px;
`
