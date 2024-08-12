# Using Prisma to Access the Database

## Table of Contents

### Summary

This readme explains how the database model is constructed. The database and all migration files are located in `./prisma`. We are using Prisma ORM to manage and abstract database functions. If there's any ambiguity, please contact Isaiah via email isaiah.vickers@outlook.com or through Asana if you're on the Syncra Team.

## Backend Team: How to access model columns to retrieve data

Prisma allows access to model schemas using native Javascript. Each model is represented as a class object, enabling access to properties similar to a regular Javascript object. Refer to the prisma folder to see what you can access, but just know that you'll use all lowercase for each model. For example, here's many ways to access a User or User(s):

#### Find many users

```javascript
const user = await prisma.user.findMany();
```

Leaving the function above blank will return all users that exist in the database
If there were a certain criteria, then pass in an options object `{}`
Prisma is Typescript based, so you could allow the autosuggestions to be your guide.

Read more in Prisma's documentation.

#### Find a single user

Use the `findUnique() method` to find a single user. This method relies on the `where` option. The value fot this key will
need ony one unique attribute of the user. To make this easy, you can use the `id` attribute.

```javascript
const user = await prisma.user.findUnique({
  where: {
    userId: "UserID", // given user id from frontend
  },
});

// the user variable is now an instance of the User model
// with all the properties in ./prisma/schema.prisma @ model User
// Check out the schema file or below for all of the properties you have access to
return user.email;
```

Read more in Prisma's documentation.

#### Create a new User

The tricky idea is that we will need firebase authentication and neon (prisma) to have consistent data.
Here's a simple example of how you could integrate Firebase authentication with Prisma

```javascript
const authenticatedUser = await createUserWithEmailAndPassword(
  auth,
  user.email,
  user.password
);

if (authenticatedUser) {
  const newUser = await prisma.user.create({
    data: {
      id: "id from firebase", // use Firebase authentication to generate a new user and
      name: "user's name",
      email: "user@example.com",
    },
  });

  if (newUser) {
    console.log("User created!");
  }
}

// the newUser variable is now an instance of the User model
// with all the properties in ./prisma/schema.prisma @ model User
// Check out the schema file or below for all of the properties you have access to
return newUser;
```

Read more in the Firebase.md file and do refer to both the Prisma and Firebase Authentication documentation to view your options.

## Prisma Studio

Prisma Studio is the GUI application that provides access to the data stored in the actual database. Once opened, you will be able to add, edit, and remove data. Careful! Only do this if you are in testing!!

As a backend developer,

- you will need to run a separate terminal and type the following command: `npx prisma studio`.
- if successful, a browser will open that goes to localhost:5555. If this doesn't happen, open your browser and navigate to localhost:5555
- if unsuccessful, read the error message in your terminal, correct the steps, and then try again.
