login Info:-
username:-emilys
password:-emilyspass
//this username or password are set by the dummyjson 

Admin Dashboard App

A Next.js 13+ admin dashboard project with:

User and Product management

Authentication using NextAuth + Zustand for token storage

Client-side caching with Zustand

Pagination and search for lists

Material UI for modern UI components

React performance optimizations (React.memo, useMemo, useCallback)

🔧 Setup Instructions

Clone the repository

git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>


Install dependencies

npm install
# or
yarn install


Create environment variables

Create a .env.local file in the project root:

NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=http://localhost:3000
# Optional API keys or tokens if needed


Run the development server

npm run dev
# or
yarn dev


Open http://localhost:3000
 in your browser.

⚡ Features

Authentication: Login via NextAuth credentials provider.

Zustand Stores: Manage auth, users, and products state.

Caching: Avoid repeated API calls with Zustand.

Pagination: API-side pagination for large lists.

Search & Filters: Filter users and products.

UI: Responsive design with Material UI components.

Performance: Optimized rendering using React.memo, useMemo, and useCallback.

📁 Folder Structure
src/
├─ app/
│  ├─ dashboard/
│  │  └─ page.js
│  ├─ login/
│  │  └─ page.js
│  ├─ products/
│  │  ├─ page.js
│  │  └─ [id]/page.js
│  ├─ users/
│  │  ├─ page.js
│  │  └─ [id]/page.js
├─ store/
│  ├─ authStore.js
│  ├─ usersStore.js
│  └─ productsStore.js

🛠 Commands
Command	Description
npm run dev	Run the development server
npm run build	Build the project for production
npm run start	Start production server
npm run lint	Run ESLint checks
🔐 Environment Variables

NEXTAUTH_SECRET – Secret key for NextAuth JWT sessions

NEXTAUTH_URL – Base URL of your app (e.g., http://localhost:3000)

Any additional API keys or tokens for external services


# Why Zustand?

We chose **Zustand** for state management because:

- **Simplicity**: Minimal boilerplate compared to Redux.  
- **Small footprint**: Lightweight, ideal for small–medium apps.  
- **Built-in async support**: Async actions can be defined directly in the store.  
- **Flexible**: Works well for managing multiple domains (auth, users, products) in one store.  
- **Better than Redux for this app**: No need for actions/reducers/types; easy to maintain and scale for small projects.
