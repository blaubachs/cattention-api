# CATtention API

## Description

<img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original-wordmark.svg" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" />
                                               

This is an API built for the web app CATtention, deployed to heroku.

This REST API features some built in websocket functionality, this readme will be updated as updates are released.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
- [License](#license)
- [Contribute](#contribute)
- [Questions](#questions)
- [Features](#features)

## Installation

Not required. Visit the link for the deployed front-end here. Or, if you would like to use our endpoints, see the section below.

## Endpoints

The url prefix for this API is `https://cattention-api.herokuapp.com/api/`

### Get Requests

`GET /rooms/`

    response {
	"id": 1,
	"room_name": "room name",
	"code": "sui7dha",
	"createdAt": "2023-03-04T22:58:08.000Z",
	"updatedAt": "2023-03-04T22:58:08.000Z",
	"UserId": 1
    }

* Returns an array of room objects.
* To only return one item, use the room code. `/rooms/:roomCode/`
    * This example would be `/rooms/sui7dha`

`GET /users/`

    response {
		"id": 3,
		"username": "blaubachs",
		"password": "$2b$04$pliO4OIq22WwhjKBIe1S8uJwPXq9fCmef8xCWFtaiciDNnY84BW6S",
		"work_time": 2147483647,
		"minigame_score": 4,
		"createdAt": "2023-03-13T17:28:34.000Z",
		"updatedAt": "2023-03-13T18:05:37.000Z"
	},

* Returns an array of user objects.
* To only return one item, use the endpoint `/users/:userId`
    * This example would be `/users/3`

`GET /cats/`

    response {
		"id": 5,
		"cat_name": "Scholar Cat",
		"img_src": "scholarly.jpg",
		"min_work_time": 600,
		"createdAt": "2023-03-13T17:27:44.000Z",
		"updatedAt": "2023-03-13T17:27:44.000Z"
	}

* Returns an array of cat objects.
* To only return one item, use the endpoint `/cats/:catId`
 * This example would be `/cats/

## License

Not licensed.

## Contributors

Alex Hall: [alexh3422](https://github.com/alexh3422)

Ben Laubach: [blaubachs](https://github.com/blaubachs)

Emma Waltho: [ewaltho](https://github.com/ewaltho)

Savannah Miller: [VisualViolet](https://github.com/ewaltho)


Contact: No contact information provided.

---

