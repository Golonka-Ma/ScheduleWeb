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
- **Email**: marcin.golonka21@gmail.com
- **GitHub**: [[https://github.com/Golonka-Ma/scheduleapp]((https://github.com/Golonka-Ma/ScheduleWeb)) 

