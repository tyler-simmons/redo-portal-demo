import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from 'app/data';
import {Portal} from 'app/pages';

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
					{/* <Login /> */}
				</Route>
				{/* @ts-ignore */}
				<ProtectedRoute path="/portal">
					<Portal />
				</ProtectedRoute>
				<Route path="/testing">
					{/* <Testing /> */}
				</Route>
				<Route path="/">
					{/* <Redirect to="/portal" /> */}
				</Route>
            </Switch>
        </Router>
    )
}

const ProtectedRoute = ({children, ...rest}: {children: any, rest: any}) => {
	

	return (
		<Route 
			{...rest}
			render={({ location }) =>
			isAuthenticated() ? (
				children
			) : (
          	<Redirect
				to={{
				pathname: "/login",
				state: { from: location }
			}}
          />
        )
      }
	/>
	)
}