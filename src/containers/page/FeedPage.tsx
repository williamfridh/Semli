import { collection, addDoc } from "firebase/firestore";
import { useFirebase } from "../../context/FirebaseContext";




const FeedPage = () => {

	/**
	 * Setup.
	 */
	
	const { auth, db } = useFirebase();


	const handleClick = async () => {
			try {
				const docRef = await addDoc(collection(db, "users"), {
					first: "Ada",
					last: "Lovelace",
					born: 1815
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
	}

	return(
		<div className="page">
			<h1>Feed</h1>
			<button onClick={handleClick}>Test</button>
		</div>
	);

}

export default FeedPage;

