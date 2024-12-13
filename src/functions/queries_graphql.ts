import { generateClient } from "aws-amplify/api"
import { listLocationsByZone, listCategories, getUser, listMagnetGroups, listEvents, getLocationByID, listBanners } from "../graphql/queries";
//@ts-ignore
import awsmobile from '../aws-exports.js'
export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
const client = generateClient();
export const listLocationsByZoneQuery = async(zone: string) =>{
    try {
        const response = await client.graphql({
            query: listLocationsByZone,
            variables: { zoneID: zone }
          });
        
          return {
            status: STATUS.SUCCESS,
            msg: 'lista de locations',
            data: response
          };
        } catch (error) {
          console.error(error);
          return {
            status: STATUS.FAIL,
            msg: 'Error al listar locations',
            data: null
          };
        }

}
export const getLocationByIDQuery = async(id: string) =>{
  try {
      const response = await client.graphql({
          query: getLocationByID,
          variables: { id: id }
        });
        console.log(response)
        return {
          status: STATUS.SUCCESS,
          msg: 'location',
          data: response
        };
      } catch (error) {
        console.error(error);
        return {
          status: STATUS.FAIL,
          msg: 'Error get locations',
          data: null
        };
      }

}
export const listCategoriesQuery = async() =>{
  try {
      const response = await client.graphql({
          query: listCategories
        });
      
        return {
          status: STATUS.SUCCESS,
          msg: 'lista de categories',
          data: response
        };
      } catch (error) {
        console.error(error);
        return {
          status: STATUS.FAIL,
          msg: 'Error al listar categories',
          data: null
        };
      }

}

export const getUserQuery = async (userID: string) =>{
  try {
    const response = await client.graphql({
        query: getUser,
        variables: { id: userID }
      });
    
      return {
        status: STATUS.SUCCESS,
        msg: 'user data',
        data: response
      };
    } catch (error) {
      console.error(error);
      return {
        status: STATUS.FAIL,
        msg: 'Error get user data',
        data: null
      };
    }

}

export const listMagnetGroupsQuery = async (userID: string) =>{
  try {
    const response = await client.graphql({
        query: listMagnetGroups,
        variables: { userID: userID }
      });
      return {
        status: STATUS.SUCCESS,
        msg: 'magnetGroups data',
        data: response
      };
    } catch (error) {
      console.error(error);
      return {
        status: STATUS.FAIL,
        msg: 'Error listing magnetGroups data',
        data: null
      };
    }

}

export const listEventsQuery = async (zoneID: string) =>{
  try {
    const response = await client.graphql({
        query: listEvents,
        variables: { zoneID: zoneID }
      });
      return {
        status: STATUS.SUCCESS,
        msg: 'events data',
        data: response
      };
    } catch (error) {
      console.error(error);
      return {
        status: STATUS.FAIL,
        msg: 'Error listing events data',
        data: null
      };
    }

}

export const listBannersQuery = async () => {
  const apiUrl = awsmobile.aws_appsync_graphqlEndpoint
  const apiKey = import.meta.env.VITE_API_KEY_GRAPHQL 

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ query: listBanners }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return {
        status: 'FAIL',
        msg: 'Error al listar banners',
        data: null,
      };
    }
    return {
      status: 'SUCCESS',
      msg: 'Lista de banners',
      data: data.data.listBanners.items
    };
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {
      status: 'FAIL',
      msg: 'Error al listar banners',
      data: null,
    };
  }
};
