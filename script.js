// script.js
document.querySelector('#search').addEventListener('click', function() {
    const query = document.querySelector('.search-box').value;
  
    if (query) {
      // Fetch data from TVMaze API
      fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
        .then(response => response.json())
        .then(data => {
          // Clear the previous search results
          const moviesSection = document.querySelector('.movies-section');
          moviesSection.innerHTML = '';
  
          // Iterate through the search results and display them
          data.forEach(result => {
            const show = result.show;
  
            // Create movie card
            const movieCard = document.querySelector('div');
            movieCard.classList.add('movie-card');
  
            // Movie image
            const movieImageDiv = document.querySelector('div');
            movieImageDiv.classList.add('movie-image');
            const movieImage = document.querySelector('img');
            movieImage.src = show.image ? show.image.medium : 'https://via.placeholder.com/210x295'; // Fallback image
            movieImage.alt = show.name;
            movieImageDiv.appendChild(movieImage);
  
            // Movie heading (show name)
            const movieHeading = document.querySelector('h3');
            movieHeading.classList.add('movie-heading');
            movieHeading.textContent = show.name;
  
            // Details section (rating and genres)
            const detailsDiv = document.querySelector('div');
            detailsDiv.classList.add('details');
  
            // Rating
            const ratingDiv = document.querySelector('div');
            ratingDiv.classList.add('rating');
            const starImage = document.querySelector('img');
            starImage.src = 'https://pngimg.com/d/star_PNG41474.png';
            starImage.height = 15;
            const rating = document.querySelector('h3');
            rating.textContent = show.rating.average ? show.rating.average : 'N/A';
            ratingDiv.appendChild(starImage);
            ratingDiv.appendChild(rating);
  
            // Genres
            const genres = document.querySelector('p');
            genres.textContent = show.genres.length > 0 ? show.genres.join(' | ') : 'No Genres Available';
  
            detailsDiv.appendChild(ratingDiv);
            detailsDiv.appendChild(genres);
  
            // Button to redirect to official website
            const websiteButton = document.querySelector('button');
            websiteButton.classList.add('button');
            websiteButton.textContent = 'Website';
            websiteButton.addEventListener('click', () => {
              window.open(show.officialSite || show.url, '_blank');
            });
  
            // Append elements to the movie card
            movieCard.appendChild(movieImageDiv);
            movieCard.appendChild(movieHeading);
            movieCard.appendChild(detailsDiv);
            movieCard.appendChild(websiteButton);
  
            // Append the movie card to the movies section
            moviesSection.appendChild(movieCard);
          });
        })
        .catch(error => console.log('Error fetching data:', error));
    } else {
      alert('Please enter a show name to search.');
    }
  });
  