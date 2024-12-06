import { generateClient } from "aws-amplify/api"
import { createUser } from "../graphql/mutations";
import { NewUserInput } from "../types/graphql";
export enum STATUS {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}
const client = generateClient();

export const createUserOnDB = async (data: NewUserInput) => {
    try {
      const response = await client.graphql({
        query: createUser,
        variables: { input: data }
      });
      console.log({
        status: STATUS.SUCCESS,
        msg: 'Usuario creado exitosamente',
        data: response
      })
      return {
        status: 'success',
        msg: 'Usuario creado exitosamente',
        data: response
      };
    } catch (error) {
      console.error(error);
      return {
        status: STATUS.FAIL,
        msg: 'Error al crear el usuario',
        data: null
      };
    }
  };
  