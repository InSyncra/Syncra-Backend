# Data Models and Structures

### Table of Contents

- [Summary](#summary)
- [For the Backend Team](#backend-team-how-to-access-model-columns-to-retrieve-data)
- [Schema Reference](#schema-reference)
  - **Main Models**
    - [User](#the-user-model)
    - [Project](#the-project-model)
    - [Comment](#the-comment-model)
    - ChatMessage
    - UserBadge
  - **Helper Models**
    - UserFollow
    - ProjectCollaboration
  - **Enum Models**
    - UserRole
    - ProjectStatus
    - UserStatus
    - BadgeAchievement

---

### Summary

This readme explains how the database model is constructed. The database and all migration files are located in `./prisma`. We are using Prisma ORM to manage and abstract database functions. If there's any ambiguity, please contact Isaiah via email isaiah.vickers@outlook.com or through Asana if you're on the DevMates Team.

## Backend Team: How to access model columns to retrieve data

Prisma allows access to model schemas using native Javascript. Each model is represented as a class object, enabling access to properties similar to a regular Javascript object. For example, to access a User:

```javascript

// Query for a user in the database. You can access the User model by simply using
// a PrismaClient instance (prisma).User
const user = await prisma.User.findUnique({
    where: {
        userId: // given user id from frontend
    }
})

// the user variable is now an instance of the User model
// with all the properties in ./prisma/schema.prisma @ model User
// Check out the schema file or below for all of the properties you have access to
return user.email;
```

## Schema API

_**Note**: The context of each `model` is the "Class" instance that represents the model. This will be replaced by the variable you choose._

### The `USER` model

---

- `USER.id/User.email`: The user's id and email is unique comes from our FIREBASE Authentication. Once a user has been successfully created and authenticated, they will be added to our database.

- `User.name`: A user can choose to add their name, in which case they will only need their first name due to the uniqueness of their email and id

- `User.bio`: A bio can be added but is not required. For the frontend team, it is recommended to keep this limited to a maximum of 250 characters

- `User.occupation`: Allows users to specify their occupation. Recommended to provide pre-defined options for consistency.

- `User.skills/User.interests`: Users can list multiple skills and interests.

- `User.rating`: Calculated based on user ratings. Requires an API request to store the overall user rating.

- `User.projects`: Users can have multiple projects, with them as the ProjectAdmins.

- `User.collaborations`: : Users can collaborate on various projects, returning details of each collaboration unless specified otherwise

- `User.comments`: Users can create comments, returning details of each comment unless specified otherwise

- `User.messagesSent`: Users can send multiple messages as the sender, returning an array of each message in detail unless specified otherwise.

- `User.messagesReceived`: Users can receive multiple messages as the recipient, returning an array of each message in detail unless specified otherwise.

- `User.followers/User.following`: Users can have followers and followings, both represented by other users. Returns details of each follower and following user unless specified otherwise.

- `User.badges`: Users can earn achievements displayed on their profile, returning an array of each badge in detail unless specified otherwise.

- `User.role`: A user is assigned the USER role by default. If granted ADMIN privileges, they gain full access, not publicly displayed. This role is restricted to authorized DevMate Team members.

- `User.status`: By default, a user's status is ACTIVE. However, the status can be set to any value in the UserStatus enum. This is useful for determining user permissions based on their status.

- `User.createdAt`: Records the date and time of the user's creation in UTC time. Useful for tracking user membership duration.

### The `Project` model

---

- `Project.id`: The ID of the project is used to uniquely identify the project

- `Project.title`: The title of the project

- `Project.description`: The description of the project

- `Project.types`: The multiple types of the project. Returns an array of strings representing each given category of the project

- `Project.githubLink`: The github link the user has added to link to the project on Github

- `Project.status`: The status of the project by default is ACTIVE. However, the status can be set to any value in the ProjectStatus enum. This is useful for determining project visibility

- `Project.discussions`: Provides a platform for project-related discussions and communication among team members. Discussions can include updates, feedback, and decision-making. Returns details of all discussions related to the project.

- `Project.adminUser`: The creator of the project. Represented in `User` as "ProjectAdmin". Returns the details of the User in full. You can also just use Project.adminUserId to only retrieve the User's id as a string

- `Project.collaborators`: Returns an array of each User that has become a collaborator of the project in detail. The relationship is handled by the `ProjectCollaboration` model

- `Project.createdAt`: Records the date and time when the project was created. Useful for tracking the project's timeline and history. Returns the creation date of the project in UTC time.

### The `Comment` model

---

- `Comment.id`: A unique identifier for the comment.

- `Comment.body`: The content of the comment.

- `Comment.userId`: The ID of the user who made the comment.

- `Comment.projectId`: The ID of the project the comment is associated with.

- `Comment.project`: A relation to the Project model, indicating the project the comment belongs to.

- `Comment.user`: A relation to the User model, indicating the user who made the comment.

- `Comment.createdAt`: The date and time when the comment was created.
