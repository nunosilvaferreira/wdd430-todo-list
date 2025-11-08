Todo List App
A feature-rich todo list application built with React, featuring multiple lists, local storage persistence, and PWA support for mobile installation.

# ✨ Features
✅ Create multiple todo lists

✅ Add, edit, and delete tasks

✅ Mark tasks as completed

✅ Local storage persistence

✅ Responsive mobile design

✅ Progressive Web App (PWA) - Installable on mobile devices

✅ Dark theme UI

✅ Real-time task statistics

## 🚀 Quick Start
Prerequisites
Node.js (version 14 or higher)

npm or yarn

Installation
Clone the repository


git clone https://github.com/nunosilvaferreira/wdd430-todo-list.git
cd wdd430-todo-list
Install dependencies


npm install
Run development server


npm run dev
Open your browser
Navigate to http://localhost:5173

### 📱 Mobile Installation
Install as PWA on Your Phone
Visit the app:
Open https://nunosilvaferreira.github.io/wdd430-todo-list/ on your mobile browser

Add to home screen:

Chrome/Android: Tap menu (⋮) → "Add to Home screen"

Safari/iOS: Tap share icon (⎙) → "Add to Home Screen"

Launch the app:
Open the app from your home screen like a native application

#### 🛠️ Build & Deploy
Build for Production

npm run build
Deploy to GitHub Pages

npm run deploy

##### 🎯 Usage
Creating Lists
Click the "+" button in the list manager

Enter a name for your new list

Switch between lists by tapping on them

Managing Tasks
Add task: Use the form at the top of any list

Complete task: Check the checkbox next to any task

Delete task: Click the "Delete" button

View stats: See pending tasks count for each list

List Management
Rename list: Click the pencil icon (✏️)

Delete list: Click the trash icon (🗑️) - requires at least 2 lists

Switch lists: Click on any list name

###### 🔧 Technical Features
Framework: React 18

Build Tool: Vite

Storage: Browser localStorage

Styling: Custom CSS with mobile-first approach

PWA: Service Worker and Web App Manifest

Deployment: GitHub Pages

##### 📁 Project Structure
text
src/
├── App.jsx          # Main application component
├── App.css          # Global styles
├── main.jsx         # Application entry point
├── TodoForm.jsx     # Form for adding new tasks
├── TodoList.jsx     # Component to display tasks
├── TodoItem.jsx     # Individual task component
└── ListManager.jsx  # Multiple lists management

#### 🌐 Browser Support
Chrome/Edge 88+

Firefox 78+

Safari 14+

Mobile browsers (Android Chrome, iOS Safari)

#### 🔒 Privacy
All your data is stored locally on your device using localStorage. No data is sent to any server - your tasks remain completely private.

#### 📄 License
This project is open source and available under the MIT License.

#### 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

#### 📞 Support
If you have any questions or need help with the app, please open an issue on GitHub.

Enjoy staying organized! 📝✨