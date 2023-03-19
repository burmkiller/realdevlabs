# realdevlabs
Technical test for real dev labs (Reactjs, Nodejs, MongoDB)

<h3 align="center">Library? Almost?</h3>


<!-- ABOUT THE PROJECT -->
## About The Project

Small technical test with the following requirements:

Build a ReactJS app that:
1- let a user search the Gutendex library for books https://gutendex.com/
2- display the results in a way they can be sorted, and paginated
3- let the user select books from the results and add them to their shortlist
4- display the shortlist
5- persist the shortlist so that the user can see it again the next time he fires his browser and go back to the app
6- reserve the books in the short list at the local library (see local library API)

Build a Local Library API that:
1- takes in book reservations for library members
2- needs the user's username to make the reservation to
3- needs the book Title and first Author
4- returns the date of availability and return date if the book is available
5- returns a message saying the book is not available if it is not
6- list our the reserved books for a user

### Built With

* Reactjs
* Expressjs
* MongoDB



<!-- GETTING STARTED -->
## Getting Started

* Clone this repo into your machine
  ```sh
  git clone https://github.com/burmkiller/realdevlabs.git
  ```

### Prerequisites

Node environment and npm

### Installation

1. cd into `frontend` and `backend` directory and run
   ```sh
   npm install
   ```
2. Make sure you use your own mongodb cluster by changing the credentials in `app.js` or contact me to whitelist your IP
   ```sh
   mongoose
    .connect('')
   ```
3. cd into `frontend` and `backend` directory and run
   ```sh
   npm run start
   ```

<!-- USAGE EXAMPLES -->
## Finished features (and missing ones)

- Backend implemented with reservation and authentication
- Frontend with reactjs 
- Book search and display (minus sorting and pagination)
- Reservation frontend integration not complete
- Signup and login

## Roadmap (kind of?)

- I wanted to dockerize the app to make it easier to setup
- Set it up with dev containers for debugging
- Finish up the remaining features (reservation and sort/pagination)
