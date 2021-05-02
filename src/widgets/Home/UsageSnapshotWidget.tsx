/** @jsxImportSource @emotion/react */
import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import {css} from '@emotion/react';
import styled from '@emotion/styled';
// @ts-ignore
import CanvasJSReact from 'app/lib/canvasjs.react';
import dateFormat from 'dateformat';

import {ModuleCard} from 'app/components';
import {Theme} from 'app/contexts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const usageSnapshotNumber = css`
	display: inline-block;
	font-size: 2.5rem;
	font-weight: bold;
	color: #1396ed;
	margin-bottom: 0;
	line-height: 1;
`;
const usageSnapshotUnit = css`
	display: inline-block;
	font-weight: 600;
	margin-left: 0.25rem;
	margin-bottom: 0.25rem;
`;
const useNumsContainer = css`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	height: 100%;
`;

const StyledSpinner = styled(Spinner)`
	width: 4rem;
	height: 4rem;
	margin: auto;
	color: ${(props) => props.color};
`;

export const UsageSnapshotWidget = ({
	currentAccount,
}: {
	currentAccount?: any;
}) => {
	const theme = useContext(Theme.Context);
	const [numbers, setNumbers] = useState({
		current: 0,
		lastYear: 0,
		lastMonth: 0,
	});

	useEffect(() => {
		console.log(currentAccount);
		if (currentAccount !== undefined) {
			setNumbers({
				current: currentAccount.AverageDailyUsage,
				lastYear: currentAccount.LastYearUsage,
				lastMonth: currentAccount.LastMonthUsage,
			});
		}
	}, [currentAccount]);

	const snapshotOptions = {
		height: 250,
		colorSet: "customSet",
		animationEnabled: true,
		axisY: {
			maximum: 230,
			minimum: 60,
			interval: 50,
			lineThickness: 0,
		},
		axisX: {
			tickThickness: 0,
		},
		dataPointWidth: 45,
		data: [
			{
				type: "column",
				dataPoints: [
					{
						label: "Aug '19",
						y: numbers.lastYear,
						color: "#a2a6ab",
					},
					{
						label: "Last Month",
						y: numbers.lastMonth,
						color: "#a2a6ab",
					},
					{
						label: "This month",
						y: numbers.current,
						color: "#1396ed",
					},
				],
			},
		],
	};

	return (
		<ModuleCard accent={theme.primary}>
			<h3>Usage Comparison</h3>
			{currentAccount ? (
				<React.Fragment>
					<Row className="mt-2">
						<Col
							sm={10}
							className="d-flex flex-column justify-content-between h-100"
						>
							<div css={useNumsContainer} className="mb-3">
								<div>
									<h5 className="mb-0 mt-4 font-weight-bold">
										Average Daily Usage
									</h5>
									<p css={usageSnapshotNumber}>
										{currentAccount.AverageDailyUsage}
									</p>
									<p css={usageSnapshotUnit}>Gallons</p>
								</div>
								<div>
									<h5 className="mb-0 mt-2 font-weight-bold">
										Total This Month
									</h5>
									<p css={usageSnapshotNumber}>{currentAccount.MonthlyUsage}</p>
									<p css={usageSnapshotUnit}>Gallons</p>
									<small className="d-block">
										Meter readings as of today:{" "}
										{dateFormat(Date.now(), "dddd, mmmm d, yyyy")}
									</small>
								</div>
							</div>
						</Col>
						<Col sm={14} className="d-flex flex-column align-items-center">
							<CanvasJSChart options={snapshotOptions} />
						</Col>
					</Row>
				</React.Fragment>
			) : (
				<StyledSpinner animation="border" color={theme.primary} />
			)}
		</ModuleCard>
	);
};