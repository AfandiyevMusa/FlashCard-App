Introduction

Welcome to the Flash Card App, a powerful educational tool built with React. This detailed README provides an in-depth exploration of the project's architecture, functionalities, and usage. The app serves as a robust platform for creating, managing, and studying flash cards, enhancing the learning experience for users.

Features

1. Flash Card Management

- Create Cards:
  - Users can seamlessly create new flash cards with text or image content.
- Update Cards:
  - Modify existing cards by updating front text, back answer, and status.
- Delete Cards:
  - Remove unwanted cards with a simple deletion process.

2. Display and Interaction

- Interactive Cards:
  - Click on a card to dynamically flip and reveal its back side.
- Search Cards:
  - Utilize the search bar to find specific cards based on text present on either side.
- Filter and Sort:
  - Organize cards by status (e.g., "Want to Learn," "Mark as Noted").
  - Apply sorting options such as order added, alphabetical order, or reverse alphabetical order.

3. Bonus Features

- Share Function:
  - Select multiple cards and share their details over email in JSON format.
  - Facilitates collaboration and sharing of flash card content.

Getting Started

To set up and run the Flash Card App on your local machine, follow these steps:

1. Clone the Repository:
   ```bash
   git clone https://github.com/AfandiyevMusa/FlashCard-App 
   ```

2. Navigate to Project Directory:
   ```bash
   cd flash-card-app
   ```

3. Install Dependencies:
   ```bash
   npm install
   ```

4. Start the JSON Server:
   ```bash
   json-server --watch src/json/cards.json --port 3001
   ```

5. Start the React App:
   ```bash
   npm start
   ```

6. Access the App:
   - Open your browser and go to [http://localhost:3000](http://localhost:3000) to experience the Flash Card App.

Project Structure

The Flash Card App follows a well-organized project structure for maintainability:

```plaintext
flash-card-app
|-- public
|-- src
|   |-- assets
|   |-- components
|   |-- pages
|   |-- services
|   |-- App.css
|   |-- App.js
|   |-- index.css
|   |-- index.js
|   |-- ...
|-- package.json
|-- README.md
|-- ...
```

- public: Contains the HTML file and other assets.
- src: The main source code directory.
  - assets: Style and image files.
  - components: Reusable React components.
  - pages: Components representing different pages.
  - services: API service for interacting with the json-server.
  - App.js: Central component orchestrating the app's structure.

Project Functionality

Flash Card Management

Creating Cards

1. Click the "Create" button.
2. Fill in the details, including front text, back answer, and status.
3. Choose whether to create a text or image-based card.

Updating Cards

1. Hover over a card and click "Edit."
2. Modify the front text, back answer, or status.
3. Save the changes to update the card.

Deleting Cards

1. Click the "Delete" button on a card.
2. Confirm the deletion to remove the card.

Display and Interaction

Interactive Cards

1. Click on a card to flip and view the back side.
2. Interact with the card's buttons for actions like updating and deleting.

Searching Cards

1. Use the search bar to find cards based on text content.

Filtering and Sorting

1. Filter cards by status using the dropdown menu.
2. Sort cards based on order added, alphabetical order, or reverse alphabetical order.

Bonus Features

Share Function

1. Select multiple cards by checking the checkboxes.
2. Click the "Share" button to share the selected cards via email in JSON format.

Conclusion

The Flash Card App provides a comprehensive solution for educational purposes. With a user-friendly interface, intuitive card management, and additional features like searching, filtering, and sharing, it offers an engaging learning experience. The modular component structure ensures code reusability and maintainability, making it a valuable tool for both learners and educators.
