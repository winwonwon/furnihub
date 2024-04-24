**!!READ ME!!**
-- Furnihub Node.js Application --
This is a Node.js application for managing products, users, and administrators in a furniture hub.

## Prerequisites:
Before running the application, make sure you have the following installed on your system:
- Node.js: https://nodejs.org/
- MySQL: https://www.mysql.com/ (or any other compatible database)

## Installation:
1. Clone the repository:
   git clone https://github.com/winwonwon/furnihub.git OR download the project folder from the submission :D

2. Navigate to the project directory:
   cd furnihub

3. Install dependencies:
   cd frontend
   npm install
   cd ../webservice
   npm install
   
   NOTE: There are two sub-directories which are different projects: frontend webserver and webservice. Make sure you install dependencies in both projects.

4. Set up the database:
   - Create a MySQL database for the application.
   - Import the database schema from webservice/model/sec3_gr09_database.sql.

5. Configure database connection:
   - Update the database configuration in webservice/.env with your MySQL database credentials.
   Note: Ensure that the MySQL user configured in the database connection has appropriate privileges to perform database operations. 
   If necessary, you may need to adjust the user's privileges to include permissions for creating, reading, updating, and deleting data in the application's database.

## Running the Application:
Once the installation is complete and the database is set up, you can run the application with the following command:
   cd webservice
   npm start
   cd ../frontend
   npm start

This will start the servers, and you should see a message indicating that the servers are running on specific ports (e.g., Listening on port 8080).

## Accessing the Application:
You can access the application through the following URL:
   http://localhost:8080/

Replace 8085 with the port number specified in the console if it's different.

## Endpoints:
The application exposes the following endpoints:

- GET /: Homepage
- GET /products: List of products
- GET /users: Retrieves all users from the API endpoint `/api/users`.
- PUT /users/:id: Updates a user with the specified ID using the API endpoint `/api/users/:id`.
- DELETE /users/:id: Deletes a user with the specified ID using the API endpoint `/api/users/:id`.
- POST /users: Creates a new user using the API endpoint `/api/users`.
- POST /products-advsearch: Performs an advanced search for products using the API endpoint `/api/products/adv-search`.
- POST /products-search: Performs a basic search for products using the API endpoint `/api/products/search`.
- DELETE /delete-products/:id: Deletes a product with the specified ID using the API endpoint `/api/products/:id`.
- GET /get-products: Retrieves all products from the API endpoint `/api/products`.
- PUT /update-products/:id: Updates a product with the specified ID using the API endpoint `/api/products/:id`.
- POST /insert-products: Inserts a new product using the API endpoint `/api/products`.
- GET /detail-products: Serves the detail products HTML file.
- GET /detail-products/:id: Retrieves details of a product with the specified ID from the API endpoint `/api/products/:id`.
- GET /about-us: Serves the About Us HTML file.
- GET /browse: Serves the browse HTML file.
- GET /login: Login Page.
- GET /admin: Admin Login Page. Redirects to /admin-landing if the user is already logged in.
- POST /admin: Authenticates an administrator using the API endpoint `/api/staff`.
- GET /admin-landing: Admin dashboard. Requires authentication.
- GET /mycart: Cart.
- GET /product-man: Product Manager Requires authentication.
- GET /user-man: User Manager. Requires authentication.
- GET /account: MyAccount page.

IMPORTANT: Some endpoints require authentication, and requests are forwarded to corresponding API endpoints for processing.
IMPORTANT: Some endpoints require authentication, and requests are forwarded to corresponding API endpoints for processing.
IMPORTANT: Some endpoints require authentication, and requests are forwarded to corresponding API endpoints for processing.

Refer to the source code or report for more details on how to interact with these endpoints.
