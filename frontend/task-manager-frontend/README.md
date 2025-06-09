Task Manager API - A RESTful API for managing tasks.
It is a simple full-stack Task Manager application built with:
Node.js, Express, PostgreSQL, dotenv, cors - the backend
React(Create React App), axios(for HTTP requests), plain CSS(for styling).
With this you can perform CRUD operations like create, view, update and delete tasks,
each of which hasa title, description, status, and due date
Data persisted in PostgreSQL
RESTful API with Express
React frontend with form validation
Responsive CSS styles

Setup: backend
1. Install PostgreSql and create a database
2. Set DATABASE in the .env file - 
NODE_ENV=development 
PORT=3000
PGDATABASE=task_manager
DATABASE_URL=postgres://chigbogwunnamani:<db_password>@localhost:5432/task_manager
3. Create the tasks table via psql on vscode schema include id
4. Run npm install
5. Start server: npm start
6. Run tests: npm test.

API Endpoints
- POST /tasks: Create task(title, description, status, due_date).
- GET /tasks/:id Retrieve task by Id.
- GET /tasks Retrieves all tasks.
- PUT /tasks/:id Update status.
- DELETE /tasks/:id Delete tasks.

Task Manager Frontend
A React App for managing tasks.

Setup
1. Run npm install
2. Add proxy: http://localhost:3000 to package.json

- Create tasks with form
- View, update status, delete tasks in a list