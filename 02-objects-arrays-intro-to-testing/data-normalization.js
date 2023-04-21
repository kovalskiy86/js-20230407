const comments = [
  {
    id: "comment-1",
    content: "text content for comment-1",
    author: {
      id: 1,
      name: "John Doe"
    },
    children: [
      {
        id: "comment-1.1",
        content: "text content for comment-1.1",
        author: {
          id: 2,
          name: "Peter Jackson"
        }
      },
      {
        id: "comment-1.2",
        content: "text content for comment-1.2",
        author: {
          id: 3,
          name: "Marry Jane"
        },
        children: [
          {
            id: "comment-1.2.1",
            content: "text content for comment-1.2.1",
            author: {
              id: 2,
              name: "Peter Jackson"
            }
          },
          {
            id: "comment-1.2.2",
            content: "text content for comment-1.2.2",
            author: {
              id: 1,
              name: "John Doe"
            }
          }
        ]
      }
    ]
  }
];

const normalizedComments = [
  {
    id: "comment-1",
    content: "text content for comment-1",
    authorId: 1,
    childrenIds: ["comment-1.1", "comment-1.2"]
  },
  {
    id: "comment-1.1",
    content: "text content for comment-1.1",
    authorId: 2,
    childrenIds: []
  },
  {
    id: "comment-1.2",
    content: "text content for comment-1.2",
    authorId: 3,
    childrenIds: ["comment-1.2.1", "comment-1.2.2"]
  },
  {
    id: "comment-1.2.1",
    content: "text content for comment-1.2.1",
    authorId: 2,
    childrenIds: []
  },
  {
    id: "comment-1.2.2",
    content: "text content for comment-1.2.2",
    authorId: 1,
    childrenIds: []
  }
];

const authors = [
  {
    id: 1,
    name: "John Doe"
  },
  {
    id: 2,
    name: "Peter Jackson"
  },
  {
    id: 3,
    name: "Marry Jane"
  }
];
