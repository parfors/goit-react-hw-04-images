const KEY = '28146499-54125423a2ce22d24a80a5e64';
const BASE_URL = `https://pixabay.com/api/`;

export const getImg = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (!response.ok) {
    return new Error(`could not fetch ${response.status}`);
  }
  return response.json();
};
