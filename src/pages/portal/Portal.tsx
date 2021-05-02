import {useWindowSize} from 'app/hooks';
import {DesktopContainers, Sidebar} from 'app/components';
import {PortalRoutes} from './PortalRoutes';

import {Toast} from 'react-bootstrap';

const {TopLevel: TopLevelCtr, Side: SideCtr, Main: MainCtr} = DesktopContainers;

export const Portal = () => {
    const {width, height} = useWindowSize();

    return (
        <TopLevelCtr>

            <SideCtr>
                <Sidebar/>
            </SideCtr>
            <MainCtr>
            <Toast
                style={{
                position: 'absolute',
                top: 0,
                right: 0,
                }}
            >     
                <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">Window Size</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>Width: {width}, Height: {height}</Toast.Body>
            </Toast>
            <PortalRoutes />
            </MainCtr>
        </TopLevelCtr>
    )
}