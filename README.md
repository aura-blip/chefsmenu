
# Chef's Menu Manager

## Project Description

Chef's Menu Manager is a mobile application developed to help chefs manage their restaurant menu items easily. The application allows users to add, view, edit, delete, search and filter menu items.

The application was developed using React Native and Expo.

## Features

### 1. Add Menu Items
- Add new dishes to the menu.
- Enter the dish name and description.
- Select a course.
- Enter the price of the dish.

### 2. View Menu Items
- Display all available menu items.
- View the name, description, course and price of each dish.

### 3. Edit Menu Items
- Update existing menu items.
- Change the dish name, description, course or price.
- Changes are reflected immediately in the application.

### 4. Delete Menu Items
- Delete menu items that are no longer required.
- Display a confirmation before deleting an item.

### 5. Search and Filter
- Search for dishes using their names.
- Filter menu items by course:
  - Starter
  - Main Course
  - Dessert
- Clear the search and filters to display all menu items.

### 6. Menu Statistics
The application displays:
- Total number of menu items.
- Average price of all menu items.
- Number of starters.
- Number of main courses.
- Number of desserts.

### 7. Input Validation
- Required fields must be completed.
- Prices must be valid numbers.
- Clear error and success messages are displayed.

## Technologies Used

- React Native
- Expo
- TypeScript
- JavaScript
- Visual Studio Code

## Installation Instructions

Follow these steps to run the application:

1. Download and extract the project ZIP file.
2. Open the project folder in Visual Studio Code.
3. Open the terminal.
4. Install the required dependencies:

   ```bash
   npm install
   ```

5. Start the application:

   ```bash
   npx expo start
   ```

6. Open the application using Expo Go or an Android emulator.

## How to Use the Application

1. Open Chef's Menu Manager.
2. View the existing menu items.
3. Add a new menu item using the Add Menu Item option.
4. Select an existing dish to edit or delete it.
5. Use the search bar to find a specific dish.
6. Use the course filters to display selected categories.
7. View the statistics section to see an overview of the menu.

## Data Storage

Menu items are stored temporarily while the application is running. The data is not permanently saved and resets when the application is fully closed.

## Project Purpose

The purpose of this project is to demonstrate the development of a simple and user-friendly mobile application. It also demonstrates menu management, search and filtering, statistics, input validation and reusable code.

## Conclusion

Chef's Menu Manager provides a simple way for chefs to manage restaurant menu items. The application improves the original version by introducing editing, deleting, searching, filtering and menu statistics while maintaining a consistent design and user-friendly interface.
