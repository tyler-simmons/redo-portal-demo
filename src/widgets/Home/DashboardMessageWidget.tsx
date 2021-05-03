/** @jsxImportSource @emotion/react */
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {css} from '@emotion/react';

import {Image} from 'react-bootstrap';

import {Button, ModuleCard, Heading, SubHeading} from 'app/components';
import {Theme} from 'app/contexts';

const MessageTitle = styled.p`
	margin-top: 2rem;
	color: white;
	font-size: 2rem;
	font-weight: 600;
	
	margin-bottom: 0;
	
`;
const MessageText = styled.p`
	color: white;
	font-size: 1.5rem;
	font-weight: 600;
	margin-bottom: 0;
`;
const MessageTextAlt = styled.p`
	color: #ffa634;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: pointer;
`;

const IImg = styled.img`
	display: block;
	max-width: 100%;
`;

export const DashboardMessageWidget = () => {
	const theme = useContext(Theme.Context);
	return (
		<ModuleCard  accent={theme.primary}>

			<div>
				<h3>Amortization Schedule</h3>
				<div>
				<IImg src={`${process.env.PUBLIC_URL}/content-img.png`} className="d-block"/>
				</div>
				

			</div>
			
			

			{/* <MessageContainer>
				<MessageTitle>Green Your Routine</MessageTitle>
				<MessageText>Thank you for being an Artesian customer. We are dedicated to quality and committed to providing our customers with superior service at a reasonable cost.</MessageText>
				<div className="d-flex flex-row justify-content-center">
					<Button shape='pill' colors={{font: '#046799', background: '#ffffff'}} className="mx-auto">Learn More</Button>
				</div>
				
			</MessageContainer> */}
			{/* <img src="/portal-demo/homepage-image.jpg" /> */}
			
			{/* <h3 className="mb-3">Reduce Your Usage</h3>
			<h5>Tip of the day</h5>
			<div className="d-flex flex-row">
				<div>
					<LargeIcon className="fas fa-shower mr-2"></LargeIcon>
				</div>
				<div>
					<p className="mb-0">
						<strong>Limit Shower Time</strong>
					</p>
					<p>
						Reducing shower time from 15 minutes to 10 can save you up to $150
						anually
					</p>
				</div>
			</div> */}
		</ModuleCard>
	);
};
