/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      
      <img src={image url of user} />
      
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      
      </div>
    
    </div>
*/



[ "ticocr21", "tetondan", "dustinmyers", "justsml", "luishrd", "bigknell" ].forEach( function( github_username )
{
  axios.get( `https://api.github.com/users/${ github_username }` )
  .then( response => document.querySelector( ".cards" ).appendChild( create_github_card( response.data ) ) )
  .catch( error => console.log( "Something Went Wrong!!!" ) )
} );

function create_github_card( github_user )
{
  const card = document.createElement( "div" );
  card.className = "card";

  const img = document.createElement( "img" );
  img.src = github_user.avatar_url;

  const card_info = document.createElement( "div" );
  card_info.className = "card-info";

  const name = document.createElement( "h3" );
  name.className = "name";
  name.textContent = github_user.name;

  const username = document.createElement( "p" );
  username.className = "username";
  username.textContent = github_user.login;

  const location = document.createElement( "p" );
  location.textContent = `Location: ${ github_user.location ? github_user.location : "N/A" }`;

  const profile = document.createElement( "p" );
  profile.innerHTML = `Profile: <a href=${ github_user.html_url } >${ github_user.html_url }</a>`;

  const followers = document.createElement( "p" );
  followers.textContent = `Followers: ${ github_user.followers }`;

  const following = document.createElement( "p" );
  following.textContent = `Following: ${ github_user.following }`;

  const bio = document.createElement( "p" );
  bio.textContent = `Bio: ${ github_user.bio ? github_user.bio : "N/A" }`;

  [ name, username, location, profile, followers, following, bio ].forEach( card_info_element => card_info.appendChild( card_info_element ) );
  [ img, card_info ].forEach( card_element => card.appendChild( card_element ) );

  return card;
}
