import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {isAuthenticated} from 'app/data';
import {Portal, Login, Registration} from 'app/pages';

export const AppRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/login">
					<Login />
				</Route>
				<Route  path='/registration'>
					<Registration />
				</Route>
				<ProtectedRoute path="/portal">
					<Portal />
				</ProtectedRoute>
				
				<Route path="/">
					<Redirect to="/portal" />
				</Route>
            </Switch>
        </Router>
    )
}

const ProtectedRoute = ({children, ...rest}: {children: any, [x:string]: any}) => {
	

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