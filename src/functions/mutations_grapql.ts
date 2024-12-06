import { generateClient } from "aws-amplify/api"
import { createUser, updateUser } from "../graphql/mutations";
import { NewUserInput } from "../types/graphql";
import { UserData } from "../types";
import { getCurrentUser } from "aws-amplify/auth";
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

export const updateUserOnDB = async (data: UserData) => {
  const { userId } = await getCurrentUser()
  try {
    const input = {
      ...data,
      id: userId
    }
    const response = await client.graphql({
      query: updateUser,
      variables: { input: input }
    });
    console.log({
      status: STATUS.SUCCESS,
      msg: 'Usuario modificado exitosamente',
      data: response
    })
    return {
      status: STATUS.SUCCESS,
      msg: 'Usuario modificado exitosamente',
      data: response
    };
  } catch (error) {
    console.error(error);
    return {
      status: STATUS.FAIL,
      msg: 'Error al modificar usuario',
      data: null
    };
  }
}
  