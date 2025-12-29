## Frontend

It's Nextjs. Make sure to install [pnpm](https://pnpm.io/installation) first.

```
cd frontend
pnpm i
pnpm run dev
```

## Backend

All of the following instructions require you to be in the backend folder:

```
cd backend
```

We're using Django for the backend. You will want to use a virtual environment. You can create one using these commands (Windows Command Prompt):

```
python -m venv venv
```

There are a few ways to activate it, but an easy way is to run:

```
"venv/Scripts/activate"
```

There may be changes to the pip packages used every so often, so initially install and update them using:

```
pip install -r requirements.txt
```

The development sqlite3 database will not be stored on the repo because it would get overwritten constantly and quite possibly cause a lot of merge conflicts. Therefore, to prevent any of these issues, create a local database using:

```
python manage.py migrate
```

This will automatically create the sqlite3 database file. This command is also required to update your local database when any migrations are made (ex: renaming a column in a table). Therefore, it is recommended that you run this every time you pull from the repo and wish to run the local server.

To run the server, execute:

```
python manage.py runserver
```

## Core Concept

Kids learn to code by dragging and dropping visual blocks instead of typing syntax, and their programs control interactive 2D games with sprites.

## Key Features

- Visual code editor - Blockly-based block programming
- Game preview - Real-time Phaser game rendering
- Sprite editor - Create and manage game objects
- Project management - Save, organize, and share projects
- Collaboration - Organizations and project sharing with permissions

## Tech Stack

- Frontend: Next.js 15 + React 19, Blockly, Phaser 4, Zustand, Tailwind CSS
- Backend: Django REST Framework with user accounts, projects, and organizations
