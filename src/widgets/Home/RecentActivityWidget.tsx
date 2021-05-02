import React, {useContext} from 'react';
import {ListGroup} from 'react-bootstrap';
import styled from '@emotion/styled';

import {Theme} from 'app/contexts';
import {ModuleCard} from 'app/components';

const AlertListGroup = styled(ListGroup)`
	&&& {
		border-top: none;
		padding-left: none;
		padding-right: none;
	}
`;
const AlertItem = styled(ListGroup.Item)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 1rem;
	padding-right: 1rem;
	cursor: pointer;
	&:hover {
		background-color: #ddd;
	}
`;

export const RecentActivityWidget = () => {
    const theme = useContext(Theme.Context);

    return (
        <ModuleCard className="px-5 py-4 h-100" accent={theme.primary}>
            <h3>Recent Activity</h3>
            <AlertListGroup variant="flush">
                <AlertItem>
                    <div>
                        <i className="fas fa-dollar-sign mr-2 "></i>
                        <span>Payment for account **3152 Received</span>
                    </div>
                    <div>8/13</div>
                </AlertItem>
                <AlertItem>
                    <div>
                        <i className="fas fa-check mr-2 "></i>
                        <span>Autodraft enrolled for account **3152</span>
                    </div>
                    <div>8/10</div>
                </AlertItem>
                <AlertItem>
                    <div>
                        <i className="fas fa-bell mr-2"></i>
                        <span>Bill ready for account **3152</span>
                    </div>
                    <div>8/10</div>
                </AlertItem>
                <AlertItem>
                    <div>
                        <i className="fas fa-mobile mr-2 "></i>
                        <span>
                            Delivery preferences updated - texting enabled
                        </span>
                    </div>
                    <div>7/05</div>
                </AlertItem>
            </AlertListGroup>
        </ModuleCard>
    )
    
};