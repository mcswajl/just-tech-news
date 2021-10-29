# E-commerce Back End Starter Code

My GitHub and video link below shows how I used several tools (see Tools used for this application section below) to demo an database internet retail service, also known as e-commerce, to GET, POST, UPDATE, and DELETE data in multiple database tables. My E-commerce database is like Shopify and WooCommerce and they provide a suite of services to businesses of all sizes. 

My challenge this week was to build the back end for an e-commerce site. I took in a working Express.js API and configured it to use Sequelize to interact with a MySQL database (database called ecommerce_db).

My application wwill not be deployed, I had to create a walkthrough video to demonstrate my back end functionality and all of the following acceptance criteria. Scroll down to see a link to my video demo.

## User Story

```md
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia Core for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
THEN I am able to successfully create, update, and delete data in my database
```

## Tools used for this application
I used the MySQL2 package to connect to your MySQL database and perform queries
I used the Sequelize packages to connect to Express.js API and mySQL database
I used the dotenv (.env) package to store sensetive date, username, and password.
I was provided a schema.sql file and seed files to run and populate my database.

## Screenshot (taken during development)
Screenshot of my website
![Screenshot](/images/screenshot.jpg)


## Github repo link
https://github.com/mcswajl/just-tech-news

## My walkthrough video link
https://watch.screencastify.com/v/dMlzpkGctWUZTqglM1G7


Contact
Josh McSwain 
joshua.mcswain@mecklenburgcountync.gov 
UNCC coding boot camp 2021