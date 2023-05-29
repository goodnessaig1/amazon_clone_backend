# amazon_clone_backend

Amazon Clone Backend Server This is the backend server for an Amazon clone application, built using Node.js, Express, and MongoDB. The server provides APIs to handle user authentication, product management, cart functionality, and order processing. Installation Clone the repository: git clone https://github.com/goodnessaig1/amazone_clone_backend.git Navigate to the project directory: cd amazon-clone-backend Install the dependencies: npm install Configuration Rename the .env.example file to .env. Update the values in the .env file with your own configuration: PORT: The port number for the server to listen on. MONGODB_URI: The connection URL for your MongoDB database. JWT_SECRET: A secret key for JSON Web Token (JWT) authentication. CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: Configuration for Cloudinary, a cloud-based image and video management service. Usage To start the server, run the following command: bash Copy code npm start The server will start running at the specified port (default is 3000) and connect to the MongoDB database. API Endpoints Authentication POST /api/auth/signup: Create a new user account. POST /api/auth/login: Log in to an existing user account. GET /api/auth/logout: Log out the currently authenticated user. Products GET /api/products: Get a list of all products. GET /api/products/:id: Get details of a specific product by ID. POST /api/products: Create a new product. PUT /api/products/:id: Update details of a specific product by ID. DELETE /api/products/:id: Delete a specific product by ID. Cart GET /api/cart: Get the cart items for the currently authenticated user. POST /api/cart: Add a product to the cart. PUT /api/cart/:id: Update the quantity of a specific cart item. DELETE /api/cart/:id: Remove a specific cart item. Orders GET /api/orders: Get a list of all orders for the currently authenticated user. GET /api/orders/:id: Get details of a specific order by ID. POST /api/orders: Create a new order. Database The backend server uses MongoDB as the database to store user accounts, products, cart items, and orders. Make sure to configure the MONGODB_URI environment variable in the .env file to point to your MongoDB database. Contributing Contributions are welcome! If you find any bugs or want to add new features, feel free to open an issue or submit a pull request. License This project is licensed under the MIT License. Contact If you have any questions or need assistance, please contact [your email address].
