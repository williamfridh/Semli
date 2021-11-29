import { BrowserRouter, Switch, Route } from 'react-router-dom';
import FeedPage from 'container/page/FeedPage';
import LogInPage from 'container/page/LogInPage';
import SettingsPage from 'container/page/SettingsPage';
import CreatePostPage from 'container/page/CreatePostPage';
import ProfilePage from 'container/page/ProfilePage';
import UserOnlineDependency from 'container/dependency/UserOnlineDependency';
import UserOfflineDependency from 'container/dependency/UserOfflineDependency';
import { FirebaseProvider } from 'context/FirebaseContext';
import BottomNavigationBar from 'component/navigation/BottomNavigationBar';
import CompleteAccountPage from 'container/page/CompleteAccountPage';
import UserCompleteProfileDependency from 'container/dependency/UserCompleteProfileDependency';
import HashtagPage from 'container/page/HashtagPage';
import SearchPage from 'container/page/SearchPage';
import ErrorPage from 'container/page/ErrorPage';
import { FunctionComponent } from 'react';
import GlobalStyles from 'shared/globalStyles';
import { ThemeProvider } from 'styled-components';
import TopNavigationBar from 'component/navigation/TopNavigationBar';
import DesktopNavigationBar from 'component/navigation/DesktopNavigationBar';
import UserInCompleteProfileDependency from 'container/dependency/UserInCompleteProfileDependency';



/**
 * Types.
 */
type ThemeContextProps = {
	color: {
		background					: string,
		boxBackground				: string,
		inputBackground				: string,
		callToAction				: string,
		callToActionDark			: string,
		textBrightHigh				: string,
		textBrightMedium			: string,
		textDarkHigh				: string
		darkCover					: string,
		bar							: string,
		success						: string,
		error						: string
	},
	size: {
		container					: number,
		distanceHuge				: number,
		distanceBig					: number,
		distanceMedium				: number,
		distanceSmall				: number,
		topNavigationBarMobile		: number,
		bottomNavigationBarMobile	: number,
		desktopNavigationBar		: number
	},
	border: {
		radius						: number,
		width						: number
	}
};



const App: FunctionComponent = (): JSX.Element => {

	let darkTheme: ThemeContextProps = {
		color: {
			background					: '#2B2E4A',
			boxBackground				: '#1a1b2d',
			inputBackground				: '#fff',
			callToAction				: '#E84545',
			callToActionDark			: '#903749',
			textBrightHigh				: '#fff',
			textBrightMedium			: '#ffffffb8',
			textDarkHigh				: '#000',
			darkCover					: '#0000008e',
			bar							: '#000',
			success						: '#277529',
			error						: '#9d1818'
		},
		size: {
			container					: 800,
			distanceHuge				: 32,
			distanceBig					: 16,
			distanceMedium				: 8,
			distanceSmall				: 4,
			topNavigationBarMobile		: 56,
			bottomNavigationBarMobile	: 56,
			desktopNavigationBar		: 80,
		},
		border: {
			radius						: 8,
			width						: 2
		}
	};
	
	return (
		<>
			<GlobalStyles />
			<ThemeProvider theme={darkTheme}>
				<FirebaseProvider>
					<BrowserRouter>

						<DesktopNavigationBar />
						<TopNavigationBar />
						<BottomNavigationBar />

						<Switch>

							{/* ======== SEARCH ======== */}
							<Route exact path="/search">
								<UserCompleteProfileDependency>
									<SearchPage />
								</UserCompleteProfileDependency>
							</Route>

							{/* ======== HASHTAG ======== */}
							<Route exact path="/hashtag/:hashtagName">
								<UserCompleteProfileDependency>
									<HashtagPage />
								</UserCompleteProfileDependency>
							</Route>

							{/* ======== CREATE POST ======== */}
							<Route exact path="/post/create">
								<UserOnlineDependency fallback="/log_in">
									<UserCompleteProfileDependency>
										<CreatePostPage />
									</UserCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							{/* ======== COMPLETE ACCOUNT ======== */}
							<Route exact path="/profile/complete">
								<UserOnlineDependency fallback="/log_in">
									<UserInCompleteProfileDependency>
										<CompleteAccountPage />
									</UserInCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							{/* ======== PROFILE ======== */}
							<Route exact path="/profile/:uid">
								<UserCompleteProfileDependency>
									<ProfilePage />
								</UserCompleteProfileDependency>
							</Route>

							{/* ======== LOG IN ======== */}
							<Route exact path="/log_in">
								<UserOfflineDependency fallback="/">
									<LogInPage />
								</UserOfflineDependency>
							</Route>

							{/* ======== SETTINGS ======== */}
							<Route exact path="/settings">
								<UserOnlineDependency fallback="/log_in">
									<UserCompleteProfileDependency>
										<SettingsPage />
									</UserCompleteProfileDependency>
								</UserOnlineDependency>
							</Route>

							{/* ======== ERROR ======== */}
							<Route exact path="/error/:code">
								<ErrorPage />
							</Route>

							{/* ======== FEED ======== */}
							<Route path="/">
								<UserCompleteProfileDependency>
									<FeedPage />
								</UserCompleteProfileDependency>
							</Route>

						</Switch>

					</BrowserRouter>
				</FirebaseProvider>
			</ThemeProvider>
		</>
	);
}

export default App;

