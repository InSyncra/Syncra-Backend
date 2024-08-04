export const schemas = {
  user: {
    id: {
      type: "string",
      description:
        "Unique identifier given to the user upon authentication. This comes from Firebase and is passed into the database.",
      unique: true,
      required: true,
    },
    email: {
      type: "string",
      description: "Unique email address provided by the user.",
      unique: true,
      required: true,
    },
    name: {
      type: "string",
      description: "First name provided by the user.",
      unique: false,
      required: true,
    },
    githubUsername: {
      type: "string",
      description: "Stores the user's GitHub handle.",
      unique: true,
      required: false,
    },
    bio: {
      type: "string",
      description:
        "A bio that can be added but is not required. Recommended to keep this limited to a maximum of 250 characters.",
      unique: false,
      required: false,
    },
    occupation: {
      type: "string",
      description:
        "Allows users to specify their occupation. Recommended to provide pre-defined options for consistency.",
      unique: false,
      required: false,
    },
    skills: {
      type: "string[]",
      description: "List of skills provided by the user.",
      unique: false,
      required: false,
    },
    interests: {
      type: "string[]",
      description:
        "List of interests provided by the user to be matched with similar users.",
      unique: false,
      required: false,
    },
    reviews: {
      type: "Review[]",
      description:
        "Returns a list of each review in detail that a user has. See Review model for attributes.",
      unique: false,
      required: false,
    },
    projects: {
      type: "Project[]",
      description:
        "Returns a list of each project in detail that a user has created. The relation of the project in this instance is that they're the project admin. See Project for attributes.",
      unique: false,
      required: false,
    },
    collaborations: {
      type: "ProjectCollaboration[]",
      description:
        "Returns a list of each project collaboration in detail. See ProjectCollaboration for attributes.",
      unique: false,
      required: false,
    },
    comments: {
      type: "Comment[]",
      description:
        "Returns a list of each comment in detail that a user has made. See Comment for attributes.",
      unique: false,
      required: false,
    },
    messagesSent: {
      type: "ChatMessage[]",
      description:
        "Returns a list of each private chat message in detail which the user is the sender.",
      unique: false,
      required: false,
    },
    messagesReceived: {
      type: "ChatMessage[]",
      description:
        "Returns a list of each private chat message in detail which the user is the receiver.",
      unique: false,
      required: false,
    },
    followers: {
      type: "User[]",
      description:
        "Returns a list of each User in detail that follows the user.",
      unique: false,
      required: false,
    },
    following: {
      type: "User[]",
      description:
        "Returns a list of each User in detail that the user follows.",
      unique: false,
      required: false,
    },
    badges: {
      type: "UserBadge[]",
      description:
        "Returns a list of badges in detail a user has acquired. See UserBadge for more attributes.",
      unique: false,
      required: false,
    },
    status: {
      type: "UserStatus",
      description:
        "By default, a user's status is ACTIVE. However, the status can be set to any value in the UserStatus enum. This is useful for determining user permissions based on their status. See UserStatus.",
      unique: false,
      required: false,
    },
    createdAt: {
      type: "string",
      description:
        "Records the date and time of the user's creation in UTC time. Useful for tracking user membership duration.",
      unique: false,
      required: false,
    },
  },
  project: {
    id: {
      type: "string",
      description:
        "The ID of the project is used to uniquely identify the project. This will be auto-generated, so it is not required.",
      unique: true,
      required: false,
    },
    title: {
      type: "string",
      description: "Title of the project. Must be provided by the user.",
      unique: false,
      required: true,
    },
    description: {
      type: "string",
      description: "Description of the project. Provided by the user.",
      unique: false,
      required: true,
    },
    categories: {
      type: "string[]",
      description: "Stores an array of each category given to the project.",
      unique: false,
      required: true,
    },
    githubLink: {
      type: "string",
      description:
        "The GitHub link the user has added to link to the project on GitHub.",
      unique: true,
      required: false,
    },
    status: {
      type: "ProjectStatus",
      description:
        "The status of the project by default is ACTIVE. However, the status can be set to any value in the [[ProjectStatus]] enum. This is useful for determining project visibility.",
      unique: false,
      required: false,
    },
    discussions: {
      type: "Comment[]",
      description:
        "Provides a platform for project-related discussions and communication among team members. Discussions can include updates, feedback, and decision-making. Returns details of all discussions related to the project.",
      unique: false,
      required: false,
    },
    adminUser: {
      type: "User",
      description:
        'The creator of the project. Represented in User as "ProjectAdmin". Returns the details of the User in full. You can also just use Project.adminUserId to only retrieve the User\'s ID as a string.',
      unique: false,
      required: true,
    },
    adminUserId: {
      type: "string",
      description: "Returns the ID of the user who created the project.",
      unique: true,
      required: true,
    },
    collaborators: {
      type: "User[]",
      description:
        "Returns an array of each User that has become a collaborator of the project in detail. The relationship is handled by the ProjectCollaboration model.",
      unique: false,
      required: false,
    },
    createdAt: {
      type: "DateTime",
      description:
        "Records the date and time when the project was created. Useful for tracking the project's timeline and history. Returns the creation date of the project in UTC time.",
      unique: false,
      required: false,
    },
    updates: {
      type: "ProjectUpdate[]",
      description:
        "Records and returns an array of each time a project was updated.",
      unique: false,
      required: false,
    },
  },
  comment: {
    id: {
      type: "string",
      description:
        "A unique identifier for the comment. This will be auto-generated, so it is not required.",
      unique: true,
      required: false,
    },
    body: {
      type: "string",
      description: "The content of the comment. Must be provided by the user.",
      unique: false,
      required: true,
    },
    userId: {
      type: "string",
      description: "The ID of the user who made the comment.",
      unique: true,
      required: true,
    },
    projectId: {
      type: "string",
      description: "The ID of the project the comment is associated with.",
      unique: true,
      required: true,
    },
    project: {
      type: "Project",
      description:
        "A relation to the Project model, indicating the project the comment belongs to.",
      unique: true,
      required: true,
    },
    user: {
      type: "User",
      description:
        "A relation to the User model, indicating the user who made the comment.",
      unique: false,
      required: true,
    },
    createdAt: {
      type: "DateTime",
      description:
        "Records the date and time when the comment was created. Useful for tracking the project's timeline and history. Returns the creation date of the project in UTC time.",
      unique: false,
      required: false,
    },
  },
};
