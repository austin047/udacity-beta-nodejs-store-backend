# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

###Instructions
Determine the RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.
Example: A SHOW route: 'blogs/:id' [GET]

Design the Postgres database tables based off the data shape requirements. Add to the requirements document the database tables and columns being sure to mark foreign keys.
Example: You can format this however you like but these types of information should be provided Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)


## API Endpoints
#### Products
- Index 
  route: '/products' [GET]

- Show (args: product id)
  route: '/products/productId' [GET]

- Create (args: Product)[token required]
  route: '/products' [POST]

- Products by category (args: product category)
  route: '/products/:productId/?category' [GET]

#### Users
- Index [token required]
  route: '/users'

- Show (args: id)[token required]
  route: '/users/:userId' [GET]

- Create (args: User)[token required]
  route: '/users' [POST]

#### Orders
- Current Order by user (args: user id)[token required]
  route: '/orders/users/userId' [POST]

- [OPTIONAL] Completed Orders by user (args: user id)[token required]
  route: '/orders/users/userId/?status=complete' [GET]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

Product (product_id: int PRIMARY KEY, name: varchar, category: varchar)

Category (product_id: int PRIMARY KEY, name: varchar)


Table


#### User
- id
- firstName
- lastName
- password

Users (user_id: int PRIMARY KEY, first_name: varchar not null, last_name: varchar, password: varchar )

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order [complete, pending]

Order (order_id: int PRIMARY KEY, user_id: int [foreign key to users table], status: varchar)


[AddtionalTable] 
#### OrderProducts
This table is an a many to many  retionship between orders and products
 - userId
 - orderId
 - productId
 - productQty

Order_Products(user_id: int [foreign key to users table ], order_id: int [foreign key to orders table ], product_id: int [foreign key to products table], product_qty: int)


