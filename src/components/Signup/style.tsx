import styled from 'styled-components';

export const Container = styled.div`

	html{
		minHeight: 100%;/* make sure it is at least as tall as the viewport */
		height: 100%;
		position: relative;
	}
	body{
		height: 100%; /* force the BODY element to match the height of the HTML element */
	}
`
