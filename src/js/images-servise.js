const BASE_URL = 'https://pixabay.com/api/';
const apiKey = '19789336-cedf960e9ca7c5db403100932';

export default {
  searchQuery: '',
  page: 1,
  fetchImages() {
    return fetch(
      `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`,
    )
      .then(res => res.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      })
      .catch(error => console.log(error));
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};

// export default {
//   searchQuery: '',
//   page: 1,
//   fetchImages() {
//     const getImages = async () => {
//       const images = await fetch(
//         `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${apiKey}`,
//       );

//       // return images;
//       console.log(this.images);
//     };

//     images
//       .then(res => res.json())
//       .then(({ hits }) => {
//         this.incrementPage();
//         return hits;
//       })
//       .catch(error => console.log(error));
//   },
//   resetPage() {
//     this.page = 1;
//   },
//   incrementPage() {
//     this.page += 1;
//   },
//   get query() {
//     return this.searchQuery;
//   },
//   set query(value) {
//     this.searchQuery = value;
//   },
// };
