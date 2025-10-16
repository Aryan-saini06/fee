document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const userName = document.getElementById('userName').value;
    const userReview = document.getElementById('userReview').value;
    
    const reviewContainer = document.getElementById('reviews');
    const reviewDiv = document.createElement('div');
    reviewDiv.classList.add('review');
    reviewDiv.innerHTML = `<strong>${userName}:</strong> ${userReview}`;
    
    reviewContainer.appendChild(reviewDiv);
    
    // Clear form fields after submission
    document.getElementById('userName').value = '';
    document.getElementById('userReview').value = '';
  });
  