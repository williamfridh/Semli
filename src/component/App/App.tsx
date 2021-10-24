import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../containers/page/HomePage';
import FeedPage from '../../containers/page/FeedPage';
import LogInPage from '../../containers/page/LogInPage';
import CreateAccountPage from '../../containers/page/CreateAccountPage';
import SettingsPage from '../../containers/page/SettingsPage';
import FeedPostPage from '../../containers/page/FeedPostPage';
import ProfilePage from '../../containers/page/ProfilePage';
import UserDependency from '../../containers/dependencies/UserDependency';
import { FirebaseProvider } from '../../context/FirebaseContext';
import NavigationBar from '../NavigationBar';



const App = () => {
	
	return (
		<div className="App">
			<FirebaseProvider>
				<BrowserRouter>

					<NavigationBar />		

						<Switch>

							<Route exact path="/">
								<HomePage />
							</Route>

							<Route exact path="/feed">
								<FeedPage />
							</Route>

							<Route exact path="/feed/post">
								<FeedPostPage />
							</Route>

							<Route exact path="/profile">
								<ProfilePage />
							</Route>

							<Route exact path="/log_in">
								<UserDependency status="offline" fallback="/feed">
									<LogInPage />
								</UserDependency>
							</Route>

							<Route exact path="/create_account">
								<UserDependency status="offline" fallback="/feed">
									<CreateAccountPage />
								</UserDependency>
							</Route>

							<Route exact path="/settings">
								<UserDependency status="online" fallback="/log_in">
									<SettingsPage />
								</UserDependency>
							</Route>

						</Switch>

				</BrowserRouter>
			</FirebaseProvider>
		</div>
	);
}

export default App;

