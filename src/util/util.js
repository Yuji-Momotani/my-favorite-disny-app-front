export const getCharacter = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url).then(resp => {
			if (!resp.ok) {
				return reject("APIの取得に失敗しました。(getCharacter)")
			}
			return resp.json()
		}).then(data => {
			return resolve(data);
		})
	})
}