import { signUp, confirmSignUp, signOut, signIn, resetPassword, confirmResetPassword } from "aws-amplify/auth"
import { getErrorMessagSignUp, getErrorMessagSignIn, getErrorMessagConfirmCode, getErrorMessagresetPassword} from "./errors_auth";
import { FormSignUpUser, FormConfirmSignUpUser, FormSignInUser, FormConfirmResetPasswordUser } from "../types/auth"
export enum STATUS {
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
  }
  export const SignUpUser = async (user: FormSignUpUser) => {
    try {
      const { userId, nextStep } = await signUp({
        username: user.username,
        password: user.password,
        options: {
          userAttributes: {
            email: user.email,
          },
          autoSignIn: true,
        },
      });
  
      return {
        status: STATUS.SUCCESS,
        msg: 'Usuario creado exitosamente',
        userID: userId,
        nextStep: nextStep,
      };
    } catch (error: unknown) {
  
      if (error instanceof Error) {
        const errorMessage = getErrorMessagSignUp(error.name);
        return {
          status: STATUS.FAIL,
          msg: errorMessage,
        };
      }
  
      return {
        status: STATUS.FAIL,
        msg: 'Error desconocido',
      };
    }
  };
  
export const confirmSignUpUser = async ( user: FormConfirmSignUpUser) =>{
  try {
    const { userId, nextStep, isSignUpComplete } = await confirmSignUp({
      username: user.username,
      confirmationCode: user.confirmationCode,
    });
    console.log(nextStep)
    return {
      status: STATUS.SUCCESS,
      msg: 'codigo valido',
      userID: userId,
      nextStep: nextStep,
      isSignUpComplete
    }
  } catch (error : any) {
    console.log(error)
    if (error instanceof Error) {
      const errorMessage = getErrorMessagConfirmCode(error.name/* , error.message */);
      return {
        status: STATUS.FAIL,
        msg: errorMessage,
      };
    }

    return {
      status: STATUS.FAIL,
      msg: 'Error desconocido',
    };
  }
}

export const signInUser = async (user : FormSignInUser) => {
  try {
    const { nextStep, isSignedIn } = await signIn({
      username: user.username,
      password: user.password
    });
    return {
      status: STATUS.SUCCESS,
      msg: 'successfull login',
      nextStep,
      isSignedIn
    }
  } catch (error : any) {
    console.log(error)
    if (error instanceof Error) {
      const errorMessage = getErrorMessagSignIn(error.name, error.message);
      return {
        status: STATUS.FAIL,
        msg: errorMessage,
      };
    }

    return {
      status: STATUS.FAIL,
      msg: 'Error desconocido',
    };
  }
}

export const LogOutUser = async () =>{
  try {
    await signOut()
    window.localStorage.removeItem('user_data')
    window.location.replace('/user-profile')
  } catch (error) {
    console.error(error)
  }
}

export const resetPasswordUser = async(username: string) =>{
  try {
    const { nextStep, isPasswordReset } = await resetPassword({
      username: username,
    });
    return {
      status: STATUS.SUCCESS,
      msg: 'successfull password reset',
      nextStep,
      isPasswordReset
    }
  } catch (error : any) {
    console.log(error)
    if (error instanceof Error) {
      const errorMessage = getErrorMessagSignIn(error.name, error.message);
      return {
        status: STATUS.FAIL,
        msg: errorMessage,
      };
    }

    return {
      status: STATUS.FAIL,
      msg: 'Error desconocido',
    };
  }
}

export const confirmResetPasswordUser = async (data: FormConfirmResetPasswordUser) =>{
  try {
    const result = await confirmResetPassword({
      username: data.username,
      newPassword: data.newPassword,
      confirmationCode: data.confirmationCode
    });
    console.log(result)
    return {
      status: STATUS.SUCCESS,
      msg: 'successfull password reset',
    }
  } catch (error : any) {
    console.log(error)
    if (error instanceof Error) {
      const errorMessage = getErrorMessagresetPassword(error.name, error.message);
      return {
        status: STATUS.FAIL,
        msg: errorMessage,
      };
    }

    return {
      status: STATUS.FAIL,
      msg: 'Error desconocido',
    };
  }
}