# restaurant-api  

# How to install  
### Clone the repository  
Download the repository by typing:  
`git clone git@github.com:uberballo/restaurant-api.git`  

### Install the required dependencies  
Move to the correct folder and type the following:  
`npm install` 
Thus you install all the required dependencies.  

### Optional, Create a .env file  
If you want to use a different port, create a .env file in the root folder with the following:  
`PORT = 3003`  
The application should now use the given port.  

### Start the program  
You may start the program by typing: 
`npm start`  
and on the terminal you will see where the program is running. In this case it would be `http://localhost:3003`  

# How to use  
Here by doing GET requests to the following address:  
`http://localhost:3003/restaurants/search?q=<keyword>&lat=<lattitude>&lon=<longitude>`   
by inserting your own keyword, langitude and longitude (example: 60.1234), the application will responde with a JSON file that contains all restaurants that containt the keyword and are in 3km range of the given coordinates.  

Here's a example query:  
`http://localhost:3003/restaurants/search?q=sushi&lat=60.17045&lon=24.93147`


# Testing  
Tests can be run with the command `npm test`  

