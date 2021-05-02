import { useContext } from "react";
import { Theme } from "app/contexts";
import { ModuleCard, Button} from "app/components";
import { Table } from "react-bootstrap";

export const StatementHistoryWidget = () => {
	const theme = useContext(Theme.Context);
	return (
		<ModuleCard accent={theme.primary} className="px-4 py-4 h-100">
			<h3>Statement History</h3>
			<Table borderless className="text-center">
				<thead>
					<tr>
						<th>Account</th>
						<th>Statement Date</th>
						<th>Statement Amount</th>
						<th>Bill Image</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>2687143152</td>
						<td>8/17/2020</td>
						<td>$101.60</td>
						<a href="#" className="btn btn-link">
							View Bill
						</a>
					</tr>
					<tr>
						<td>2687143152</td>
						<td>7/17/2020</td>
						<td>$105.32</td>
						<a href="#" className="btn btn-link">
							View Bill
						</a>
					</tr>
					<tr>
						<td>2687143152</td>
						<td>6/17/2020</td>
						<td>$72.32</td>
						<a href="#" className="btn btn-link">
							View Bill
						</a>
					</tr>
				</tbody>
			</Table>
		</ModuleCard>
	);
};
