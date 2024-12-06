import { generateClient } from "aws-amplify/api"
import { getUser } from "../graphql/queries";
export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
const client = generateClient();
export const getUserInfo = async (id: string) => {
    console.log(id);
    try {
        const response = await client.graphql({
            query: getUser,
            variables: { id } 
        });
        return {
            status: STATUS.SUCCESS,
            msg: 'user data',
            //@ts-ignore
            data: response.data.getUser || null
        };
    } catch (error) {
        console.error(error);
        return {
            status: STATUS.FAIL,
            msg: 'Error graphql query',
            data: null
        };
    }
}
