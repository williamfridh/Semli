import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../../containers/page/HomePage';
import FeedPage from '../../containers/page/FeedPage';
import LogInPage from '../../containers/page/LogInPage';
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
import SearchPage from '../../containers/page/SearchPage';
import ErrorPage from '../../containers/page/ErrorPage';
import { FunctionComponent } from 'react';
import GlobalStyle from '../../shared/globalStyles';
import { ThemeDataProvider, useTheme } from '../../context/ThemeContext';
import { ThemeProvider } from 'styled-components';

const App: FunctionComponent = (): JSX.Element => {

	const { theme } = useTheme();

	console.log(theme);
	
	return (
		<div>
			<GlobalStyle />
			<ThemeDataProvider>
				<ThemeProvider theme={theme}>
					<FirebaseProvider>
						<BrowserRouter>

							<NavigationBar />

								<Switch>

									<Route exact path="/">
										<UserOfflineDependency fallback="/feed">
											<UserCompleteProfileDependency>
												<HomePage />
											</UserCompleteProfileDependency>
										</UserOfflineDependency>
									</Route>

									<Route exact path="/feed">
										<UserOnlineDependency fallback="/log_in">
											<UserCompleteProfileDependency>
												<FeedPage />
											</UserCompleteProfileDependency>
										</UserOnlineDependency>
									</Route>

									<Route exact path="/search">
										<UserOnlineDependency fallback="/log_in">
											<UserCompleteProfileDependency>
												<SearchPage />
											</UserCompleteProfileDependency>
										</UserOnlineDependency>
									</Route>

									<Route exact path="/hashtag/:hashtagName">
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

									<Route exact path="/settings">
										<UserOnlineDependency fallback="/log_in">
											<UserCompleteProfileDependency>
												<SettingsPage />
											</UserCompleteProfileDependency>
										</UserOnlineDependency>
									</Route>

									<Route exact path="/error/:code">
										<ErrorPage />
									</Route>

								</Switch>

						</BrowserRouter>
					</FirebaseProvider>
				</ThemeProvider>
			</ThemeDataProvider>
		</div>
	);
}

export default App;

