# Testowanie i Jakość Oprogramowania

## Authors
* Marcin Golonka 
* Jakub Jędrychowski

## Project Topic
**Implementation of tests in a schedule management system**  
*(Implementacja testów w systemie zarządzania typu plan zajęć)*

## Project Description
This project is a web-based schedule management application that allows users to create, edit, and manage their events and tasks. It supports user authentication, priority-based event categorization, and provides multiple calendar views (daily, weekly, monthly). Users can interact with a visually appealing interface, toggle between light and dark modes, and filter or export their schedule.

The project demonstrates:
- A fully functioning backend with Spring Boot, JWT-based authentication, and MySQL database integration.
- A frontend application built with React.js and FullCalendar for displaying events.
- Comprehensive testing, including unit and integration tests, to ensure code quality, stability, and correctness.

This application showcases a professional approach to building a maintainable, testable, and reliable web application.

# Schedule Application

## Description
The Schedule Application is a web-based calendar system that allows users to manage tasks and events effectively. Users can create, edit, and delete schedule items, assign priorities, and view events in different views like daily, weekly, or monthly, with color-coded backgrounds representing event priority.

## Features
- **Add Schedule Items**: Add tasks and events by specifying details like title, type, location, start time, end time, description, and priority (Low, Medium, High, Urgent).
- **Edit/Delete Schedule Items**: Modify or remove existing tasks using a user-friendly interface.
- **View Modes**: Switch between different views (day, week, month) for better visualization of tasks.
- **Priority-Based Backgrounds**: Each task's priority is highlighted with different colors for easy identification.
- **Dark Mode**: A dark mode toggle option for better usability in different environments.
- **User Authentication**: Secured authentication and personalized user experience.

## Technologies Used
- **Frontend**: React.js, FullCalendar, TailwindCSS for styling.
- **Backend**: Spring Boot, Java, Jakarta Persistence API (JPA), Hibernate.
- **Database**: MySQL.
- **Authentication**: JWT-based authentication for secure user management.

## Installation Guide
### Prerequisites
- **Node.js** and **npm** (for running the frontend)
- **Java 17** (or later for backend)
- **MySQL** database
- **Postman** (optional for API testing)

### Backend Setup
1. Clone the repository.
2. Navigate to the backend directory:
   ```sh
   cd schedule backend
   ```
3. Set up your **application.properties** file for database connection:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/schedule_app
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
4. Run the backend application:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd schedule frontend
   ```
2. Install the dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```
4. Access the application at **http://localhost:3000**.

## Usage
- Register a new account or login using existing credentials.
- Use the sidebar to navigate through user settings or logout.
- Click on the calendar to add new events.
- Edit or delete existing tasks by clicking on them.

## API Endpoints
- **GET /api/schedule/list**: Retrieve the list of schedule items for the authenticated user.
- **POST /api/schedule/add**: Add a new schedule item.
- **PUT /api/schedule/update/{id}**: Update an existing schedule item.
- **DELETE /api/schedule/delete/{id}**: Delete a schedule item.

## Priority Levels
Tasks are categorized into four priority levels:
- **Low**: Background color of green.
- **Medium**: Background color of yellow.
- **High**: Background color of orange.
- **Urgent**: Background color of red.

These backgrounds help differentiate tasks visually, especially when viewing in week or day views.

## Development
- **React Components**:
  - `AddScheduleItemModal`: Used to add a new event with all necessary details.
  - `EditScheduleItemModal`: Allows users to modify or delete tasks.
- **Backend REST Controller**:
  - Provides API endpoints to manage tasks with CRUD functionality.

## License
This project is licensed under the MIT License.

## Contact
For any questions or suggestions, feel free to contact the developers.
- **Email**: marcin.golonka21@gmail.com & jakubjedrychowski2@gmail.com
- **GitHub**: [https://github.com/Golonka-Ma/ScheduleWeb](https://github.com/Golonka-Ma/ScheduleWeb)

## Running the Project

### Prerequisites
- **Java 17** or later
- **Maven** (to build the backend)
- **Node.js and npm** (to run the frontend)
- **MySQL** database (for backend persistence)

### Backend (Spring Boot)
1. Clone the repository.
2. Configure `application.properties` with your database credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/schedule_app
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
3. Run the backend:
   ```sh
   mvn spring-boot:run
   ```
4. The backend will start on [http://localhost:8080](http://localhost:8080).

### Frontend (React.js)
1. Navigate to the frontend directory:
   ```sh
   cd schedule-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend:
   ```sh
   npm start
   ```
4. The frontend will start on [http://localhost:3000](http://localhost:3000).

## Tests

### Unit Tests
Unit tests focus on individual components, services, and utilities within the application, ensuring that each unit of code works as intended in isolation. These tests are located primarily in the `src/test/java` directory under corresponding service, controller, and repository packages.

### Integration Tests
Integration tests verify that different parts of the application work together as expected, such as interactions between the service layer and the database. They ensure that components integrate correctly, focusing on end-to-end flows within the backend. These tests are also located in the `src/test/java` directory, often annotated with `@SpringBootTest` and run with a test database configuration.

Examples of both unit and integration tests can be found in:
- `src/test/java/com/example/schedulebackend` (for integration tests)
- `src/test/java/com/example/schedulebackend` (for unit tests)

These tests use JUnit and Mockito to provide a comprehensive testing strategy, ensuring code quality and reliability.

To run all tests:
```sh
mvn test
```

## API Documentation

The backend provides a RESTful API to manage schedule items and user authentication. Some key endpoints include:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Schedule Management
- `GET /api/schedule/list` - Retrieve all schedule items for the authenticated user
- `POST /api/schedule/add` - Add a new schedule item
- `PUT /api/schedule/update/{id}` - Update an existing schedule item
- `DELETE /api/schedule/delete/{id}` - Delete a schedule item

These endpoints expect and return JSON data. JWT tokens are required for protected endpoints, ensuring that only authenticated users can access or modify schedule items.

## Test Cases for Manual Testing (TestCase)

Below are sample test cases prepared for manual testing. They verify core functionalities like logging in, registering, adding/editing schedule items, and handling permissions.

### Detailed Test Cases:
#### TC001: User Login
**Preconditions:** Application open on the login page.

**Steps:**
1. Enter a valid email in the 'Email' field.
2. Enter a valid password in the 'Password' field.
3. Click the 'Login' button.

**Expected Result:** User is logged in and redirected to the main schedule page.

#### TC002: Invalid Login
**Preconditions:** Application open on the login page.

**Steps:**
1. Enter an invalid email in the 'Email' field.
2. Enter any password in the 'Password' field.
3. Click the 'Login' button.

**Expected Result:** An error message is displayed: "Invalid login credentials."

#### TC003: New User Registration
**Preconditions:** Application open on the registration page.

**Steps:**
1. Enter an email in the 'Email' field.
2. Enter a password in the 'Password' field.
3. Re-enter the password in the 'Confirm Password' field.
4. Click the 'Register' button.

**Expected Result:** User is registered and redirected to the login page.

#### TC004: Adding a New Schedule Item
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the 'Add New Item' button.
2. Enter a title in the 'Title' field.
3. Select a date and time in the 'Date' field.
4. Click the 'Save' button.

**Expected Result:** The new schedule item is saved and displayed in the list.

#### TC005: Editing an Existing Schedule Item
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the edit icon next to a selected schedule item.
2. Update the title in the 'Title' field.
3. Click the 'Save' button.

**Expected Result:** The schedule item is updated and displayed with the new title.

#### TC006: Deleting a Schedule Item
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the delete icon next to a selected schedule item.
2. Confirm the action in the dialog box.

**Expected Result:** The schedule item is removed from the list.

#### TC007: Viewing Future Schedule Dates
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the 'Next Day' button.
2. Review the schedule items for the selected day.

**Expected Result:** Schedule items for the selected day are displayed.

#### TC008: Handling Empty Schedules
**Preconditions:** User is logged in, with no items in the schedule.

**Steps:**
1. Open the schedule page.

**Expected Result:** A message is displayed: "No items in the schedule."

#### TC009: Automatic Logout After Session Expiration
**Preconditions:** User is logged in, but the session has expired.

**Steps:**
1. Wait for the session to expire.
2. Attempt to click any item on the page.

**Expected Result:** User is redirected to the login page.

#### TC010: Changing User Password
**Preconditions:** User is logged in and on the account settings page.

**Steps:**
1. Click the 'Change Password' button.
2. Enter the old password.
3. Enter a new password.
4. Click the 'Save' button.

**Expected Result:** Password is changed, and a message is displayed: "Password successfully changed."

#### TC011: Displaying User List
**Preconditions:** User is logged in as an administrator.

**Steps:**
1. Navigate to the 'Users' section in the main menu.
2. Check if the user list is displayed correctly.

**Expected Result:** The user list is displayed correctly.

#### TC012: Filtering Schedule Items
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Enter a date in the filtering field.
2. Click the 'Filter' button.

**Expected Result:** Only schedule items matching the entered date are displayed.

#### TC013: Exporting Schedule to File
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the 'Export' button.
2. Select a file format (e.g., CSV).
3. Click 'Save'.

**Expected Result:** Schedule is saved in the selected format.

#### TC014: Importing Schedule from File
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the 'Import' button.
2. Select a CSV file containing schedule data.
3. Click 'Open'.

**Expected Result:** Schedule items from the file are imported and displayed in the list.

#### TC015: Changing User Roles
**Preconditions:** User is logged in as an administrator.

**Steps:**
1. Navigate to the 'Users' section.
2. Click the edit button next to a selected user.
3. Change the user's role to "Administrator".
4. Click 'Save'.

**Expected Result:** The user's role is updated and displayed in the user table.

#### TC016: Access Denied for Restricted Features
**Preconditions:** User is logged in as a regular user.

**Steps:**
1. Attempt to access the 'Users' section.

**Expected Result:** A message is displayed indicating insufficient permissions.

#### TC017: Saving Draft Schedule Item
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the 'Add New Item' button.
2. Enter schedule item details.
3. Click 'Save as Draft'.

**Expected Result:** The new schedule item is saved as a draft and marked as "draft" in the list.

#### TC018: Email Notification for New Schedule Item
**Preconditions:** User is logged in and has added a new schedule item.

**Steps:**
1. Add a new schedule item.
2. Check the email inbox associated with the user's account.

**Expected Result:** An email notification about the new schedule item is received.

#### TC019: Assigning Schedule Item to Another User
**Preconditions:** User is logged in and on the schedule page.

**Steps:**
1. Click the edit button next to a selected schedule item.
2. Select a user from the "Assign to" dropdown list.
3. Click 'Save'.

**Expected Result:** The schedule item is assigned to the selected user.

#### TC020: User Logout
**Preconditions:** User is logged in.

**Steps:**
1. Click the logout icon in the top menu.
2. Confirm the action in the dialog box.

**Expected Result:** User is logged out and redirected to the login page.

These test cases ensure comprehensive functionality and usability testing for the Schedule Application.

## Technologies Used

### Backend:
- Spring Boot (REST API)
- Spring Security (JWT-based authentication)
- Java Persistence API (JPA) with Hibernate
- MySQL (Database)

### Frontend:
- React.js
- FullCalendar (Calendar component)
- TailwindCSS (Styling)

### Build and Test Tools:
- Maven (Backend build)
- npm (Frontend build)
- JUnit, Mockito (Testing)
- Postman (Optional for manual API testing)

This combination of technologies ensures a modern, maintainable, and scalable web application with robust testing and high-quality code.
