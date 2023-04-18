#### Basic Routes and Middleware
[x] setup /GET Route
[x] setup express.json() middleware
[x] setup 404 and errorHandler middleware
[x] setup 'expres-async-errors' package

#### User Model
[x] create models folder and User.js file
[x] create schema with name, email, passowrd
[x] export model

#### Auth Routes Structure
[x] create controllers folder
[x] add authController file
[x] export (login, logout, register) functions
[x] res.send('some string value')
[x] create routes folder
[x] setup authRoutes file
[x] import all controllers
[x] setup three routes
[x] post('/register') post('/login') get('/logout')
[x] import authRoutes as authRouter in the app.js
[x] setup app.use('/api/v1/auth', authRouter);


#### Register Controller
[x] create user
[x] send response with entire user (testing purposes)
[x] check if email already in use
[x] igone 'role'
[] alternative 'admin' setup