import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../containers/page/HomePage';
import FeedPage from '../../containers/page/FeedPage';
import LogInPage from '../../containers/page/LogInPage';
import CreateAccountPage from '../../containers/page/CreateAccountPage';
import SettingsPage from '../../containers/page/SettingsPage';
import CreatePostPage from '../../containers/page/CreatePostPage';
import ProfilePage from '../../containers/page/ProfilePage';
import UserOnlineDependency from '../../containers/dependencies/UserOnlineDependency';
import UserOfflineDependency from '../../containers/dependencies/UserOfflineDependency';
import { FirebaseProvider } from '../../context/FirebaseContext';
import NavigationBar from '../NavigationBar';
import CompleteAccountPage from '../../containers/page/CompleteAccountPage';
import UserCompleteProfileDependency from '../../containers/dependencies/UserCompleteProfileDependency';
import HashtagPage from '../../containers/page/HashtagPage';



const App = () => {
	
	return (
		<div className="App">
			<FirebaseProvider>
				<BrowserRouter>

					<NavigationBar />		

						<Switch>

							<Route exact path="/">
								<UserCompleteProfileDependency>
									<HomePage />
								</UserCompleteProfileDependency>
							</Route>

							<Route exact path="/feed">
								<UserOnlineDependency fallback="/log_in">
									<UserCompleteProfileDependency>
										<FeedPage />
									</UserCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							<Route exact path="/hashtag/:hashtag">
								<UserOnlineDependency fallback="/log_in">
									<UserCompleteProfileDependency>
										<HashtagPage />
									</UserCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							<Route exact path="/post/create">
								<UserOnlineDependency fallback="/log_in">
									<UserCompleteProfileDependency>
										<CreatePostPage />
									</UserCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							<Route exact path="/profile/complete">
								<UserOnlineDependency fallback="/log_in">
									<CompleteAccountPage />
								</UserOnlineDependency>
							</Route>

							<Route exact path="/profile/:uid">
								<UserCompleteProfileDependency>
									<ProfilePage />
								</UserCompleteProfileDependency>
							</Route>

							<Route exact path="/log_in">
								<UserOfflineDependency fallback="/feed">
									<LogInPage />
								</UserOfflineDependency>
							</Route>

							<Route exact path="/create_account">
								<UserOfflineDependency fallback="/feed">
									<CreateAccountPage />
								</UserOfflineDependency>
							</Route>

							<Route exact path="/settings">
								<UserOnlineDependency fallback="/log_in">
									<SettingsPage />
								</UserOnlineDependency>
							</Route>

						</Switch>

				</BrowserRouter>
			</FirebaseProvider>
		</div>
	);
}

export default App;

