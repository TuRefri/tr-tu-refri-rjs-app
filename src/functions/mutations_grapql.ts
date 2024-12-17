import { generateClient } from "aws-amplify/api"
import { 
  createUser,
  updateUser,
  deleteMagnet,
  createMagnet,
  createMagnetGroup,
  updateMagnetGroup,
  deleteMagnetGroup
 } from "../graphql/mutations";
import { NewUserInput } from "../types/graphql";
import { UserData } from "../types";
import { getCurrentUser } from "aws-amplify/auth";
import { MagnetGroupInput } from "../types/magnetGroup";
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
      return {
        status: STATUS.SUCCESS,
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
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Usuario modificado exitosamente',
      data: response
    }) */
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
  

/* Magnets */
export const createMagnetOndDB = async (locationID: string, magentGroupID: string) =>{
  try {
    const input = {
      locationID,
      magentGroupID
    }
    const response = await client.graphql({
      query: createMagnet,
      variables: { input: input }
    });
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Magnet creado',
      data: response
    }) */
    return {
      status: STATUS.SUCCESS,
      msg: 'Magnet creado',
      data: response
    };
  } catch (error) {
    console.error(error);
    throw {
      status: STATUS.FAIL,
      msg: 'Error al crear Magnet',
      data: null
    };
  }
}

export const deleteMagnetOnDB = async(id: string) =>{
  try {
    const input = {
      id: id
    }
    const response = await client.graphql({
      query: deleteMagnet,
      variables: { input: input }
    });
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Magnet eliminado',
      data: response
    }) */
    return {
      status: STATUS.SUCCESS,
      msg: 'Magnet eliminado',
      data: response
    };
  } catch (error) {
    console.error(error);
    throw {
      status: STATUS.FAIL,
      msg: 'Error al eliminar Magnet',
      data: null
    };
  }
}

export const createMagnetGroupOndDB = async (item : MagnetGroupInput) =>{
  try {
    const { userId } = await getCurrentUser()
    item.userID = userId
    const response = await client.graphql({
      query: createMagnetGroup,
      variables: { input: item }
    });
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Magnet creado',
      data: response
    }) */
    return {
      status: STATUS.SUCCESS,
      msg: 'MagnetGroup creado',
      data: response
    };
  } catch (error) {
    console.error(error);
    throw {
      status: STATUS.FAIL,
      msg: 'Error al crear MagnetMagnetGroup',
      data: null
    };
  }
}

export const deleteMagnetGroupOndDB = async (id : string) =>{
  try {

    const response = await client.graphql({
      query: deleteMagnetGroup,
      variables: { input: { id: id} }
    });
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Magnet creado',
      data: response
    }) */
    return {
      status: STATUS.SUCCESS,
      msg: 'MagnetGroup eliminado',
      data: response
    };
  } catch (error) {
    console.error(error);
    throw {
      status: STATUS.FAIL,
      msg: 'Error al eliminar MagnetMagnetGroup',
      data: null
    };
  }
}
export const updateMagnetGroupOnDB = async (item: MagnetGroupInput) => {
  try {
    const response = await client.graphql({
      query: updateMagnetGroup,
      variables: { input: item }
    });
    /* console.log({
      status: STATUS.SUCCESS,
      msg: 'Usuario modificado exitosamente',
      data: response
    }) */
    return {
      status: STATUS.SUCCESS,
      msg: 'MagnetGroup modificado exitosamente',
      data: response
    };
  } catch (error) {
    console.error(error);
    return {
      status: STATUS.FAIL,
      msg: 'Error al modificar MagnetGroup',
      data: null
    };
  }
}

/* Magnets */