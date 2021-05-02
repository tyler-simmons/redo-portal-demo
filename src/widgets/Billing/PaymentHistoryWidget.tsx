import React, {useContext} from 'react';
import {Table} from 'react-bootstrap';

import {Theme} from 'app/contexts';
import {ModuleCard} from 'app/components';
import { useTable, usePagination, Column, Row } from "react-table";

export const PaymentHistoryWidget = () => {
	const theme = useContext(Theme.Context);

	const data: Array<any> = React.useMemo(
		() => [
			{
				col1: "AutoPay",
				col2: "9/8/2020",
				col3: "$91.25",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA2213",
			},
			{
				col1: "AutoPay",
				col2: "8/6/2020",
				col3: "$65.20",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKC5451",
			},
			{
				col1: "AutoPay",
				col2: "7/5/2020",
				col3: "$101.25",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKF5576",
			},
			{
				col1: "AutoPay",
				col2: "6/8/2020",
				col3: "$88.62",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKE2902",
			},
			{
				col1: "AutoPay",
				col2: "5/9/2020",
				col3: "$75.20",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA2212",
			},
			{
				col1: "AutoPay",
				col2: "4/7/2020",
				col3: "$74.12",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA2134",
			},
			{
				col1: "AutoPay",
				col2: "3/8/2020",
				col3: "$91.25",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA4312",
			},
			{
				col1: "AutoPay",
				col2: "2/6/2020",
				col3: "$98.87",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA1222",
			},
			{
				col1: "AutoPay",
				col2: "1/6/2020",
				col3: "$82.56",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKA1098",
			},
			{
				col1: "AutoPay",
				col2: "12/7/2019",
				col3: "$42.69",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKB3322",
			},
			{
				col1: "AutoPay",
				col2: "11/8/2019",
				col3: "$99.12",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKB2901",
			},
			{
				col1: "AutoPay",
				col2: "10/7/2019",
				col3: "$120.21",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKB2214",
			},
			{
				col1: "AutoPay",
				col2: "9/8/2019",
				col3: "$110.30",
				col4: "VISA **1234 - Primary Debit",
				col5: "#OKB2315",
			},
		],
		[]
	);

	const columns: Array<Column> = React.useMemo(
		() => [
			{
				Header: "Payment Type",
                accessor: "col1", 
			},
			{
				Header: "Payment Date",
				accessor: "col2",
			},
			{
				Header: "Amount",
				accessor: "col3",
			},
			{
				Header: "Payment Method",
				accessor: "col4",
			},
			{
				Header: "Confirmation Number",
				accessor: "col5",
			},
		],
		[]
	);
	
    // @ts-ignore
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        // @ts-ignore
        page,
        // @ts-ignore
        canPreviousPage,
        // @ts-ignore
        canNextPage,
        // @ts-ignore
        pageOptions,
        // @ts-ignore
        pageCount,
        // @ts-ignore
        gotoPage,
        // @ts-ignore
        nextPage,
        // @ts-ignore
        previousPage,
        // @ts-ignore
        setPageSize,
        // @ts-ignore
        state: {pageIndex, pageSize}
    } = useTable({
          columns, 
          data, 
          // @ts-ignore
          initialState: {pageIndex: 0, pageSize: 6}
        }, usePagination
    );

	return (
		<ModuleCard accent={theme.primary} className="px-4 py-4 h-100">
			<div className="d-flex justify-content-start w-50">
				<ul className="pagination mr-3">
					<li className={`page-item ${!canPreviousPage && "disabled"}`}>
						<button
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
							className="page-link"
						>
							Previous
						</button>
					</li>
					{createPageArray(pageCount).map((pageNum, idx) => (
						<li
							key={`page${pageNum + 1}`}
							className={`page-item ${pageNum === pageIndex && "active"}`}
						>
							<button onClick={() => gotoPage(pageNum)} className="page-link">
								{pageNum + 1}
							</button>
						</li>
					))}
					<li className={`page-item ${!canNextPage && "disabled"}`}>
						<button
							onClick={() => nextPage()}
							disabled={!canNextPage}
							className="page-link"
						>
							Next
						</button>
					</li>
				</ul>

				<div className="form-group w-25">
					<select
						className="form-control"
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[6, 12, 24].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>

			<Table hover {...getTableProps()}>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps()}>{column.render("Header")}</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row: Row<object>, i: any) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											className={cell.value === "AutoPay" ? "auto-pay" : ''}
										>
											{cell.value === "AutoPay" && (
												<i className="fas fa-check-circle mr-1"></i>
											)}
											{cell.value === "AutoPay" ? (
												<strong>{cell.render("Cell")}</strong>
											) : (
												cell.render("Cell")
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</Table>
		</ModuleCard>
	);
};

const createPageArray = (pageCount: any) => {
	let arr = [];
	for (let i = 0; i < pageCount; i++) {
		arr.push(i);
	}
	return arr;
};



