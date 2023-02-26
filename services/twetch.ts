import { GraphQLClient, gql } from "graphql-request";

const graphqlAPI = "https://gw.twetch.app";
const authToken = "";

const graphqlClient = new GraphQLClient(graphqlAPI, {
  headers: {
    Authorization: `Bearer ${authToken}`,
  },
});

export const getLocalFeed = async () => {
  const result = await fetch("/api/local", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getLocalFeedPagination = async (cursor: string) => {
  const result = await fetch(`/api/local?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getGlobalFeed = async () => {
  const result = await fetch("/api/global", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getGlobalFeedPagination = async (cursor: string) => {
  const result = await fetch(`/api/global?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getPostResults = async (input: string) => {
  const result = await fetch(`/api/search/posts?search=${input}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getPostResultsPagination = async (input: string, cursor: string) => {
  const result = await fetch(
    `/api/search/posts?search=${input}&cursor=${cursor}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
        "content-type": "application/json",
      },
    }
  );
  return result.json();
};

export const getUserResults = async (input: string) => {
  const result = await fetch(`/api/search/users?search=${input}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const getUserResultsPagination = async (input: string, cursor: string) => {
  const result = await fetch(
    `/api/search/users?search=${input}&cursor=${cursor}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
        "content-type": "application/json",
      },
    }
  );
  return result.json();
};


export const userProfileCardAnonQuery = async (id: number) => {
  const query = gql`
    query userProfileCardAnonQuery($id: BigInt!) {
      userById(id: $id) {
        ...userProfileCard
        ...userIcon
      }
    }

    fragment userIcon on User {
      id
      icon
      verifiedIcon
    }

    fragment userProfileCard on User {
      name
      id
      icon
      description
      profileUrl
      followingCount
      followerCount
      dmConversationId
      banner
      publicKey
      twitterHandle
    }
  `;

  const result = await graphqlClient.request(query, { id });
  return result.userById;
};

export const userProfileLatestFeedQuery = async (userId: number) => {
  const result = await fetch(`/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLatestFeedPaginationQuery = async (userId: number, cursor: string) => {
  const result = await fetch(`/api/user/${userId}?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileReplyFeedQuery = async (userId: number) => {
  const result = await fetch(`/api/user/${userId}/replies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileReplyFeedPaginationQuery = async (userId: number, cursor: string) => {
  const result = await fetch(`/api/user/${userId}/replies?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLikeFeedQuery = async (userId: number) => {
  const result = await fetch(`/api/user/${userId}/likes`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileLikeFeedPaginationQuery = async (userId: number, cursor: string) => {
  const result = await fetch(`/api/user/${userId}/likes?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileMediaFeedQuery = async (userId: number) => {
  const result = await fetch(`/api/user/${userId}/media`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const userProfileMediaFeedPaginationQuery = async (userId: number, cursor: string) => {
  const result = await fetch(`/api/user/${userId}/media?cursor=${cursor}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("tokenTwetchAuth")}`,
      "content-type": "application/json",
    },
  });
  return result.json();
};

export const postDetailQuery = async (txid: string) => {
  let query = `
  query postDetailQuery($txid: String!) {
    allPosts(condition: { transaction: $txid }) {
      edges {
        node {
          bContent
          createdAt
          files
          id
          numBranches
          numLikes
          postsByReplyPostId {
            totalCount
          }
          replyPostId
          transaction
          type
          youBranchedCalc
          youLikedCalc
          userId
          userByUserId {
            icon
            name
          }
          children {
            edges {
              node {
                bContent
                createdAt
                files
                id
                numBranches
                numLikes
                postsByReplyPostId {
                  totalCount
                }
                replyPostId
                transaction
                type
                youBranchedCalc
                youLikedCalc
                userId
                userByUserId {
                  icon
                  name
                }
              }
            }
          }
          parents {
            edges {
              node {
                bContent
                createdAt
                files
                id
                numBranches
                numLikes
                postsByReplyPostId {
                  totalCount
                }
                replyPostId
                transaction
                type
                youBranchedCalc
                youLikedCalc
                userId
                userByUserId {
                  icon
                  name
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const result = await graphqlClient.request(query, { txid });
  return result.allPosts;
};
