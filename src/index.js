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
  createToyCards(data);
})
.catch(function(error) {
  // Handle any errors
});

//function to create toy cards
function createToyCards(toys) {
  const toyCollection = document.getElementById('toy-collection');

  toys.forEach(function(toy) {
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

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(likes);
    card.appendChild(likeBtn);

    toyCollection.appendChild(card);
  });
}

//Post new toys
fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({
    name: 'New Toy',
    description: 'A description of the new toy',
    image: 'https://example.com/new-toy-image.jpg',
    likes: 0,
  }),
})
  .then(response => response.json())
  .then(data => {
    // Handle the response data here, such as updating the DOM
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
  });