import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import React, { FunctionComponent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/FirebaseContext";
import { HandleSearchInterface, HashtagProps } from "../../shared/types";
import * as S from '../../shared/globalStyles';

const SearchForm: FunctionComponent = () => {

	const [term, setTerm] 				= useState('');
	const [isLoading, setIsLoading] 	= useState(false);
	const [result, setResult] 			= useState<HashtagProps[]|null>(null);

	const { firestoreDatabase } = useFirebase();

	const handleSearch: HandleSearchInterface = async e => {

		try {

			const newTerm = e.target.value
				.replaceAll('#', '')
				.replaceAll('å', 'a')
				.replaceAll('ä', 'a')
				.replaceAll('ö', 'o')
				.replaceAll(' ', '')
				.toLowerCase();

			setTerm(newTerm);
			setIsLoading(true);
			if (!newTerm || newTerm.length <= 2) {
				setIsLoading(false);
				return;
			}

			const q = query(collection(firestoreDatabase, "hashtags"), where("name", ">=", newTerm), where("name", "<=", newTerm+ '\uf8ff'));
			const qDocSnap = await getDocs(q);
		
			let hashtagArr: HashtagProps[] = [];
		
			qDocSnap.forEach((hashtagSnap: QueryDocumentSnapshot<DocumentData>) => {
				const hashtagData = hashtagSnap.data();
				const name = hashtagData.name;
				const amount = hashtagData.amount;
				hashtagArr.push({
					name,
					amount
				});
			});

			setResult(hashtagArr);
			setIsLoading(false);

		} catch (e) {
			console.error(`SearchForm >> ${e}`);
		}
		
	}

	return (
		<div className="search">
			<S.Input type="text" onChange={handleSearch} value={term} placeholder="Search for hashtags" />
			<div className="search-results">
				{isLoading && <div>Searching...</div>}
				{result && result.map((obj: HashtagProps, key: number) => {
					const {name, amount} = obj;
					return <NavLink to={`/hashtag/${name}`} key={key}><div>{name}({amount})</div></NavLink>;
				})}
			</div>
		</div>
	);

}

export default SearchForm;

