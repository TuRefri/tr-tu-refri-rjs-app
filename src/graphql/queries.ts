export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
        id
        name
        username
        avatar
        bannerProfile
        birthday
        email
    }
 }
`;

export const listLocationsByZone = /* GraphQL */ `
  query ListLocations($zoneID: ID!) {
    listLocations(filter: {zoneID: {eq: $zoneID}}) {
      items {
        id
        address
        phone
        store {
          name
          avatarImage
          description
          categories {
          items {
            id
            categoryId
            category {
              name
            }
          }
        }
        }
        latitude
        longitud
        zoneID
      }
      nextToken
    }
  }
`;


export const listCategories = /* GraphQL */ `
  query ListCategories {
    listCategories {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

export const listMagnetGroups = /* GraphQL */ `
  query ListMagnetGroups($userID: ID!) {
    listMagnetGroups(filter: {userID: {eq: $userID}}) {
      items {
        id
        name
        magnets {
          items {
            id
            location {
              id
              address
              phone
              store {
                avatarImage
                description
                name
                categories {
                  items {
                    category {
                      name
                    }
                  }
                }
              }
              promotions {
                items {
                  id
                  title
                  description
                  startDate
                  endDate
                  image
                }
              }
              schedules {
                items {
                  id
                  day
                  openingTime
                  closingTime
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const listEvents = `
  query Listevents($zoneID: ID!) {
    listEvents(filter: {zoneID: {eq: $zoneID}}) {
      items {
        id
        zoneID
        title
        description
        image
        location
        date
      }
    }
  }
`