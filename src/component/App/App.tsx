import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from 'container/page/HomePage';
import FeedPage from 'container/page/FeedPage';
import LogInPage from 'container/page/LogInPage';
import SettingsPage from 'container/page/SettingsPage';
import CreatePostPage from 'container/page/CreatePostPage';
import ProfilePage from 'container/page/ProfilePage';
import UserOnlineDependency from 'container/dependency/UserOnlineDependency';
import UserOfflineDependency from 'container/dependency/UserOfflineDependency';
import { FirebaseProvider } from 'context/FirebaseContext';
import NavigationBar from 'component/NavigationBar';
import CompleteAccountPage from 'container/page/CompleteAccountPage';
import UserCompleteProfileDependency from 'container/dependency/UserCompleteProfileDependency';
import HashtagPage from 'container/page/HashtagPage';
import SearchPage from 'container/page/SearchPage';
import ErrorPage from 'container/page/ErrorPage';
import { FunctionComponent } from 'react';
import GlobalStyles from 'shared/GlobalStyles';
import { ThemeProvider } from 'styled-components';
import { ThemeContextProps } from 'shared/types';

const App: FunctionComponent = (): JSX.Element => {

	let theme: ThemeContextProps;

	theme = {
		color: {
			background			: '#2B2E4A',
			boxBackground		: '#1a1b2d',
			inputBackground		: '#fff',
			callToAction		: '#E84545',
			callToActionDark	: '#903749',
			textBrightHigh		: '#fff',
			textDarkHigh		: '#000'
		}
	};
	
	return (
		<div>
			<GlobalStyles />
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
		</div>
	);
}

export default App;

