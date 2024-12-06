export const getErrorMessagSignUp = (errorCode: string): string => {
    switch (errorCode) {
      case 'CodeDeliveryFailureException':
        return 'Hubo un problema al enviar el código de verificación. Intenta de nuevo.';
      case 'ForbiddenException':
        return 'Tu solicitud no está permitida. Verifica las configuraciones de seguridad.';
      case 'InternalErrorException':
        return 'Hubo un error interno en el servidor. Intenta más tarde.';
      case 'InvalidEmailRoleAccessPolicyException':
        return 'No se puede utilizar tu identidad de correo electrónico. Verifica las configuraciones de tu cuenta.';
      case 'InvalidLambdaResponseException':
        return 'Hubo un error con la respuesta de Lambda. Intenta más tarde.';
      case 'InvalidParameterException':
        return 'Uno de los parámetros proporcionados no es válido. Verifica tus datos.';
      case 'InvalidPasswordException':
        return 'La contraseña no cumple con los requisitos. Asegúrate de que tenga al menos 8 caracteres, incluya mayúsculas, números y símbolos.';
      case 'InvalidSmsRoleAccessPolicyException':
        return 'No tienes permisos para enviar mensajes SMS. Verifica la configuración de SNS.';
      case 'InvalidSmsRoleTrustRelationshipException':
        return 'La relación de confianza para los SMS no es válida. Verifica la configuración de tu rol.';
      case 'LimitExceededException':
        return 'Has excedido el límite de solicitudes. Intenta más tarde.';
      case 'NotAuthorizedException':
        return 'No estás autorizado para realizar esta acción. Verifica tus permisos.';
      case 'ResourceNotFoundException':
        return 'No se pudo encontrar el recurso solicitado. Verifica la configuración de tu cuenta.';
      case 'TooManyRequestsException':
        return 'Has realizado demasiadas solicitudes. Espera un momento e intenta de nuevo.';
      case 'UnexpectedLambdaException':
        return 'Hubo un error inesperado con Lambda. Intenta de nuevo más tarde.';
      case 'UserLambdaValidationException':
        return 'Hubo un error de validación en Lambda. Intenta de nuevo más tarde.';
      case 'UsernameExistsException':
        return 'El nombre de usuario ya está en uso. Elige otro nombre.';
      default:
        return 'Hubo un error desconocido. Intenta de nuevo más tarde.';
    }
  };
  

  export const getErrorMessagSignIn = (errorCode: string, message: string): string => {
    switch (errorCode) {
      case 'InternalErrorException':
        return 'Hubo un error interno en el servidor. Intenta más tarde.';
      case 'LimitExceededException':
        return 'Has excedido el límite de solicitudes. Intenta más tarde.';
      case 'NotAuthorizedException':
        if(message === 'Password attempts exceeded'){
            return 'Límite de intentos excedido. Por favor, intenta más tarde.'
        }
        return 'Usuario o contraseña incorrecta.';
      case 'ResourceNotFoundException':
        return 'No se pudo encontrar el recurso solicitado. Verifica la configuración de tu cuenta.';
      case 'TooManyRequestsException':
        return 'Has realizado demasiadas solicitudes. Espera un momento e intenta de nuevo.';
      case 'UnexpectedLambdaException':
        return 'Hubo un error inesperado con Lambda. Intenta de nuevo más tarde.';
      case 'UserNotFoundException':
        return 'El usuario ingresado no existe.';
      case 'UsernameExistsException':
        return 'El nombre de usuario ya está en uso. Elige otro nombre.';
      default:
        return 'Hubo un error desconocido. Intenta de nuevo más tarde.';
    }
  };

  export const getErrorMessagConfirmCode = (errorCode: string/* , message: string */): string => {
    switch (errorCode) {
      case 'InternalErrorException':
        return 'Hubo un error interno en el servidor. Intenta más tarde.';
      case 'CodeMismatchException':
        return 'Código inválido. Por favor, intenta de nuevo.';
      case 'LimitExceededException':
        return 'Límite de intentos excedido. Por favor, intenta más tarde.'
      default:
        return 'Hubo un error desconocido. Intenta de nuevo más tarde.';
    }
  };

  export const getErrorMessagresetPassword = (errorCode: string, message: string): string => {
    switch (errorCode) {
      case 'InternalErrorException':
        return 'Hubo un error interno en el servidor. Intenta más tarde.';
      case 'LimitExceededException':
        return 'Has excedido el límite de solicitudes. Intenta más tarde.';
      case 'NotAuthorizedException':
        if(message === 'Password attempts exceeded'){
            return 'Límite de intentos excedido. Por favor, intenta más tarde.'
        }
        return 'Usuario o contraseña incorrecta.';
      case 'UserNotFoundException':
        return 'El usuario ingresado no existe.';
      case 'CodeMismatchException':
        return 'Código inválido. Por favor, intenta de nuevo.';
      case 'UsernameExistsException':
        return 'El nombre de usuario ya está en uso. Elige otro nombre.';
      default:
        return 'Hubo un error desconocido. Intenta de nuevo más tarde.';
    }
  };