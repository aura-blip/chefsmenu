CHEF'S MENU MANAGER - FINAL POE UPDATES

This version keeps the original simple screen layout and styling. It only adds the features required for the final POE.

Added:
- Add a menu item with a price.
- Edit a saved menu item.
- Delete a menu item after confirmation.
- Search menu items by dish name.
- Filter by Starter, Main Course or Dessert.
- Clear search and filters.
- Show total menu items, average price and item counts per course.
- Basic validation for empty fields and invalid prices.

To run:
1. Extract the ZIP file.
2. Open the project folder in VS Code.
3. Run npm install.
4. Run npx expo start.

Note: Menu items are stored in a shared in-memory list, as in the simple original project. They reset when the app is fully closed. Persistent storage has not been added.
