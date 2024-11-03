const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

async function searchMovies(query) {
  try {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=9911af41&s=${query}`);
    if (response.data.Response === "True") {
      displayResults(response.data.Search);
    } else {
      resultsContainer.innerHTML = `<p>Фільми не знайдени</p>`;
    }
  } catch (error) {
    console.error("Помлка запросу до API:", error);
    resultsContainer.innerHTML = `<p>Виникла помилка підчас завантаження даних</p>`;
  }
}

function displayResults(movies) {
  resultsContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
      <h3>${movie.Title} (${movie.Year})</h3>
      <p>Тип: ${movie.Type}</p>
    `;
    resultsContainer.appendChild(movieElement);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (query.length > 2) {
    searchMovies(query);
  } else {
    resultsContainer.innerHTML = '';
  }
});
