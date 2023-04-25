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

#### User Routes Structure
[x] add userController file
[x] export (getAllUsers, getSingleUser, showCurrentUser, updateUser, updatePasswordUser) functions
[x] res.send('dummy value')
[x] setup userRoutes file
[x] import all controllers
[x] setup just one route - retrieve all users
[x] import userRoutes as userRouter in the app.js
[x] setup app.use('/api/v1/users', userRouter) 

#### UpdateUserPassword

[x] add authenicate user in the route
[x] check for old and new password in the body
[x] if one missing 400
[x] look for user in db 
[x] check if old password matches with users password
[x] if no match 401
[x] if OK, update users passwordS


[
  {
    "name": "accent chair",
    "price": 25999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/e8bc3791196535af65f40e36993b9e1f/438bd160",
    "colors": ["#ff0000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "office"
  },
  {
    "name": "albany sectional",
    "price": 109999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/0be1af59cf889899b5c9abb1e4db38a4/d631ac52",
    "colors": ["#000", "#ffb900"],
    "company": "liddy",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "kitchen"
  },
  {
    "name": "armchair",
    "price": 12599,
    "image": "https://dl.airtable.com/.attachmentThumbnails/530c07c5ade5acd9934c8dd334458b86/cf91397f",
    "colors": ["#000", "#00ff00", "#0000ff"],
    "company": "marcos",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "bedroom"
  },
  {
    "name": "emperor bed",
    "price": 23999,
    "image": "https://dl.airtable.com/.attachmentThumbnails/0446e84c5bca9643de3452a61b2d6195/1b32f48b",
    "colors": ["#0000ff", "#000"],
    "company": "ikea",
    "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
    "category": "bedroom"
  }
]