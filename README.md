# TaskFlow – Task Management Web Application

TaskFlow is a web-based task management application built to help users organise daily activities, manage deadlines, and track progress from a single dashboard. Users can create and update tasks, set dates and times, assign priorities, and review tasks by status.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [How It Works](#how-it-works)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Run Locally](#run-locally)
- [Firebase Configuration](#firebase-configuration)
- [Testing Checklist](#testing-checklist)
- [Future Improvements](#future-improvements)

## Project Overview

The purpose of TaskFlow is to provide a simple interface for organising tasks and monitoring their status. The application uses React for the user interface and Firebase services for authentication and cloud task storage.

## Features

- **User authentication:** Register, log in, and log out using Firebase Authentication.
- **Dashboard:** View task summary cards and access task-management controls.
- **Task management:** Add, edit, complete, and delete tasks.
- **Task details:** Save a title, description, date, time, reminder interval, and priority.
- **Task status:** View total, pending, completed, today's, and overdue tasks where applicable.
- **Search and filtering:** Search tasks and filter them by priority.
- **Reminders and notifications:** Reminder scheduling and an in-app notification page.
- **Profile management:** View and edit profile information.
- **Settings:** Access notification preferences, appearance options, and help/about pages.

> Note: Available features and their behaviour depend on the final source code and Firebase configuration.

## Technology Stack

| Technology / Library | Purpose |
| --- | --- |
| React | Builds the component-based user interface |
| JavaScript | Application logic |
| Vite | Development server and build tool |
| React Router DOM | Client-side page navigation |
| Firebase Authentication | User registration, login, logout, and password-reset flow |
| Cloud Firestore | Cloud storage for user task records |
| Lucide React | Icons used in the interface |
| CSS | Layout, styling, and appearance |
| Node.js and npm | Run development tools and manage packages |
| ESLint | Helps identify code-quality issues |

## How It Works

1. The application checks the user's Firebase authentication state when it starts.
2. After a user signs in, the application loads that user's tasks from Firestore.
3. Tasks are saved under a user-specific path, such as `users/{userId}/tasks`.
4. Adding, editing, or deleting a task updates Firestore and the displayed task list.
5. The dashboard provides task summaries, search, priority filtering, and links to task-specific views.
6. Selected local preferences and in-app notification data may be stored in browser `localStorage`.

Firestore security rules should ensure that users can access only their own records.

## Project Structure

A simplified example of the main files and folders:

```text
taskflow/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── firebase.js
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

Your actual folder structure may differ. Update this section to match the files in your repository.

## Prerequisites

Before running the project, install:

- [Node.js](https://nodejs.org/) (preferably a supported LTS release)
- npm (included with Node.js)
- [Visual Studio Code](https://code.visualstudio.com/) or another code editor
- Access to the Firebase project configured for this application

## Run Locally

1. **Clone the repository** (replace the placeholder with your repository URL):

   ```bash
   git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   ```

2. **Open the project folder:**

   ```bash
   cd YOUR-REPOSITORY
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

   On Windows PowerShell, if the `npm` command is blocked, try:

   ```powershell
   npm.cmd install
   ```

4. **Check Firebase configuration.** Open the Firebase configuration file (for example, `src/firebase.js` or `firebase.js`, depending on your project) and confirm that it points to the correct Firebase project.

5. **Start the development server:**

   ```bash
   npm run dev
   ```

   On Windows PowerShell, you can also try:

   ```powershell
   npm.cmd run dev
   ```

6. **Open the local URL** printed in the terminal. It is commonly `http://localhost:5173/`. If that port is already in use, Vite may display a different port.

7. **Stop the server** by returning to the terminal and pressing `Ctrl+C`.

### Optional: Build for production

```bash
npm run build
```

To preview the build locally:

```bash
npm run preview
```

## Firebase Configuration

TaskFlow uses Firebase Authentication and Cloud Firestore.

1. Open the Firebase Console and select the project configured for TaskFlow.
2. Enable the authentication provider used by the application.
3. Confirm that Cloud Firestore is set up.
4. Configure Firestore Security Rules so authenticated users can access only their own task documents.
5. Check that the Firebase configuration used by the app is correct.

**Security reminder:** Never commit Firebase service-account private keys, passwords, or other secrets to a public repository. Firebase web configuration is not a replacement for properly configured Firestore Security Rules.

## Testing Checklist

- [ ] Register and sign in with a test account.
- [ ] Verify that invalid login details show a helpful error.
- [ ] Refresh the page and check authentication state.
- [ ] Add, edit, complete, and delete a task.
- [ ] Test task dates, times, priorities, and status views.
- [ ] Test search and priority filters.
- [ ] Test reminder preferences and in-app notifications.
- [ ] Check profile editing and navigation.
- [ ] Check the interface in light and dark appearance modes, if enabled.
- [ ] Confirm Firestore access rules prevent access to another user's tasks.


## Challenges and Lessons Learned

During development, key implementation areas included:

- Waiting for Firebase authentication state before showing authenticated pages.
- Displaying clear messages for authentication errors.
- Keeping task records associated with the signed-in user's UID.
- Keeping task lists and summary cards consistent after task updates.
- Comparing task date/time values to calculate pending and overdue status.
- Avoiding duplicate reminder scheduling and respecting reminder preferences.
- Correcting route paths, imports, and CSS conflicts during interface updates.

## Future Improvements

- Add automated tests for authentication and task workflows.
- Improve reminder cancellation and rescheduling when a task or preference changes.
- Improve accessibility and responsive layout testing.
- Add clearer handling of offline and Firebase errors.
- Review and test Firestore security rules before deployment.

## Author

**Name:** [Anjali Jodatti]  
**Course / Institution:** [Full Stack Developer Intern]  
**GitHub:** [https://github.com/Anjali-Jodatti/TaskFlow.git]

---

If you find an issue or have a suggestion, please open an issue in this repository.
