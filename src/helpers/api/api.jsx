export class ApiService {
  KEY = '28146499-54125423a2ce22d24a80a5e64';
  BASE_URL = `https://pixabay.com/api/`;

  async getImg(query, page) {
    const response = await fetch(
      `${this.BASE_URL}?q=${query}&page=${page}&key=${this.KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (!response.ok) {
      return new Error(`could not feth ${response.status}`);
    }
    return response.json();
  }

  // async getFitData(query) {
  //   const response = await this.getImg(query);
  //   console.log(response);
  //   const fitData = response.hits.map(el => this.formatData(el));
  //   return fitData;
  // }

  // formatData = element => ({
  //   id: element.id,
  //   webformatURL: element.webformatURL,
  //   largeImageURL: element.largeImageURL,
  // });
}
