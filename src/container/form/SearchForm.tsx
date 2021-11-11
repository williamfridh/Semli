import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import React, { FunctionComponent, useState } from "react";
import { useFirebase } from "context/FirebaseContext";
import { HandleSearchInterface, HashtagProps } from "shared/types";
import * as SC from 'component/StyledComponents';
import SvgLoadingDark from "component/icon/LoadingDark";

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
				setResult(null);
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
		<div>
			<SC.InputHolder>
				<SC.Input type="text" onChange={handleSearch} value={term} placeholder="Search for hashtags" />
				{isLoading && <SC.InputLoading><SvgLoadingDark /></SC.InputLoading>}
			</SC.InputHolder>
			<div className="search-results">
				{result && result.map((obj: HashtagProps, key: number) => {
					const {name, amount} = obj;
					return <SC.SeachFormResult to={`/hashtag/${name}`} key={key}>#{name} ({amount})</SC.SeachFormResult>;
				})}
			</div>
		</div>
	);

}

export default SearchForm;

