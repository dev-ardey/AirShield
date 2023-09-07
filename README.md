# wind-mobile-app


Airshield 🛡️ 

An innovative app designed to address health risks caused by air pollution in pollution-prone areas.
• Utilizes real-time data to alert users about approaching polluted air and provides information about the specific components in the air.
• Offers users advice on optimal actions, such as opening windows and engaging in outdoor activities, to minimize pollution intake.
• Incorporates scientific research to ensure the app is effective in helping users make informed decisions about their well-being.
• Has received positive feedback and numerous requests for expansion, demonstrating the efficiency and necessity of this app.


the app includes:

📍 Coordinates and Locations:

      The code defines coordinates for two locations and makes calculations with them.

📟API Request Handling:

      It makes API to retrieve weather data for the polluter location.
      It implements a delay mechanism to prevent excessive API requests, with a 2-second delay for the first request and 
      10- minute intervals for subsequent requests.


🗺️ Geolocation:

      It uses the navigator.geolocation API to get the user's current position (latitude and longitude).

📡Weather Data Rendering:

      The code fetches and renders various weather-related data such as temperature, wind direction, and precipitation.
      It rotates arrow icons based on wind direction.
      It dynamically sets shield images and background colors based on the wind direction.

⛅️ Folding Functionality:

      It provides the ability to toggle visibility of hourly and daily weather information.

🩻Pollution Data:

      The code includes a new section for fetching and displaying air pollution data, including AQI (Air Quality Index) and various pollutant components.
      It provides a button to toggle the display of pollution data.
      It uses geolocation to retrieve pollution data based on the user's location.

🪄Button Interaction:

      The code contains buttons that allow users to interact with the app, such as toggling visibility of specific      
      elements.

⚙️Coordinate Calculations:

      It includes functions for calculating bearings between coordinates.

🎙️ Event Listeners:

      The code registers event listeners for handling button clicks and other user interactions.

🖼️ CSS Styling:

      It imports CSS styles and applies them to various elements in the web page.

📊Presentation of Data:

      The code is designed to visually present weather and pollution data in a user-friendly manner.

📈Error Handling:

      It includes error handling for API requests and geolocation
