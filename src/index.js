let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


//fetch toy and render
fetch("http://localhost:3000/toys", {
    method: 'GET',
})
.then(function(response) {
  return response.json();
})
.then(function(data) {
  data.forEach(toy=>createToyCard(toy))
})
.catch(function(error) {
  // Handle any errors
});

//function to create toy cards
function createToyCard(toy) {
    const toyCollection = document.getElementById('toy-collection');
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const name = document.createElement('h2');
    name.innerText = toy.name;

    const image = document.createElement('img');
    image.setAttribute('src', toy.image);
    image.setAttribute('class', 'toy-avatar');

    const likes = document.createElement('p');
    likes.innerText = `${toy.likes} Likes`;

    const likeBtn = document.createElement('button');
    likeBtn.setAttribute('class', 'like-btn');
    likeBtn.setAttribute('id', toy.id);
    likeBtn.innerText = 'Like ❤️';

    card.append(name, image, likes, likeBtn);

    toyCollection.append(card);
}

const form = document.querySelector(".add-toy-form")
const nameInput = document.getElementById('name-input');
const imgInput = document.getElementById("image-input");

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    //Post new toys

    fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    name: nameInput.value,
    image: imgInput.value,
    likes: 0,
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data here, such as updating the DOM
    createToyCard(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
})

//increase a toy's like 
document.addEventListener("click", (e)=>{
  if(e.target.classList.contains("like-btn")){
    const toyId = e.target.id;
    const currentLikesElement = e.target.previousElementSibling ; // Get the element displaying the current likes
    const currentLikes = parseInt(currentLikesElement.innerText); // Parse the current likes count
    const newLikes = currentLikes + 1; // Calculate the new number of likes

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data here, such as updating the DOM
        currentLikesElement.innerText = `${data.likes} Likes`;
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    }
    
  })

/*

// Add event listener for the "Like" button click
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("like-btn")) {
    const toyId = e.target.id; // Get the toy's id from the button's id attribute

    const currentLikesElement = e.target.previousSibling; // Get the element displaying the current likes
    const currentLikes = parseInt(currentLikesElement.innerText); // Parse the current likes count

    const newLikes = currentLikes + 1; // Calculate the new number of likes

    fetch(`http://localhost:3000/toys/${toyId}`, { // Update the URL with the toy's id
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the likes count in the DOM
        currentLikesElement.innerText = `${data.likes} Likes`;
      })
      .catch(error => {
        console.error(error);
      });
  }
});
*/