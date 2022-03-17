import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '../../../helper/httpHelpers/usersHttp';
import useForm from '../../../hooks/useForm';
import { toastActions } from '../../../store/toast';
import './EditUserForm.scss';

const EditUserForm = ({ user, closeCreate, closeEdit, create = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // enteredFirstName input
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeInputValueHandler: changeFirstName,
    inputBlurHandler: firstNameBlurHandler,
    setInputValue: setFirstName
  } = useForm((val) => val.trim().length !== 0);

  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    inputBlurHandler: lastNameBlurHandler,
    setInputValue: setLastName
  } = useForm((val) => val.trim().length !== 0);

  // enteredDocumentType input
  const {
    value: documentType,
    isValid: documentTypeIsValid,
    hasError: documentTypeHasError,
    changeInputValueHandler: changeDocumentType,
    inputBlurHandler: documentTypeBlurHandler,
    setInputValue: setDocumentType
  } = useForm((val) => +val >= 0 && +val <= 2, 1);

  // enteredDocumentId input
  const {
    value: documentId,
    isValid: documentIdIsValid,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    inputBlurHandler: documentIdBlurHandler,
    setInputValue: setDocumentId
  } = useForm(
    (val) => val.length >= 8 && val.length <= 10 && /^[0-9\b]+$/.test(val)
  );

  // enteredEmail input
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputValueHandler: changeEmail,
    inputBlurHandler: emailBlurHandler,
    setInputValue: setEmail
  } = useForm((val) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(val).toLowerCase()
    )
  );

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    changeInputValueHandler: changePassword,
    inputBlurHandler: passwordBlurHandler
  } = useForm((val) => val.trim().length >= 8);

  // RolEntered
  const {
    value: rol,
    isValid: rolIsValid,
    hasError: rolHasError,
    changeInputValueHandler: changeRol,
    inputBlurHandler: rolBlurHandler,
    setInputValue: setRol
  } = useForm((val) => +val >= 0 && +val <= 1, 0);

  useEffect(() => {
    const updateInfoUser = async () => {
      try {
        await updateUser(token, {
          id: user.id,
          firstName,
          lastName,
          docType: documentType,
          docNumber: documentId,
          email,
          password,
          role: rol
        });
        dispatch(
          toastActions.setInfo({
            title: 'Success',
            text: 'Se ha actualizado satisfactoriamente',
            type: 'success',
            show: true
          })
        );
        closeEdit();
      } catch (error) {
        dispatch(
          toastActions.setInfo({
            title: 'Error',
            text: error,
            type: 'error',
            show: true
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    const createInfoUser = async () => {
      try {
        await createUser(token, {
          firstName,
          lastName,
          docType: documentType,
          docNumber: documentId,
          email,
          password,
          role: rol
        });
        dispatch(
          toastActions.setInfo({
            title: 'Success',
            text: 'Se ha creado satisfactoriamente',
            type: 'success',
            show: true
          })
        );
        closeCreate();
      } catch (error) {
        dispatch(
          toastActions.setInfo({
            title: 'Error',
            text: error,
            type: 'error',
            show: true
          })
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && !create) return updateInfoUser();
    if (isLoading && create) return createInfoUser();
  }, [
    closeCreate,
    closeEdit,
    create,
    dispatch,
    documentId,
    documentType,
    email,
    firstName,
    isLoading,
    lastName,
    password,
    rol,
    token,
    user
  ]);

  useEffect(() => {
    if (create) return;
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setDocumentType(+user.docType);
    setDocumentId(String(user.docNumber));
    setEmail(user.email);
    setRol(user.role);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    documentTypeIsValid &&
    documentIdIsValid &&
    emailIsValid &&
    (showPassword ? passwordIsValid : true) &&
    rolIsValid;

  return (
    <div className="edit-user card p-3">
      <h2>{create ? 'Nuevo Usuario' : 'Editar usuario'}</h2>
      <form className="edit-user__form d-flex justify-content-center align-items center flex-column">
        <input
          type="text"
          value={firstName}
          onChange={changeFirstName}
          onBlur={firstNameBlurHandler}
          placeholder="Nombres"
        />
        {firstNameHasError && (
          <p className="edit-user__form-error">Por favor, ingrese un nombre</p>
        )}
        <input
          type="text"
          value={lastName}
          onChange={changeLastName}
          onBlur={lastNameBlurHandler}
          placeholder="Apellidos"
        />
        {lastNameHasError && (
          <p className="edit-user__form-error">
            Por favor, ingrese un apellido
          </p>
        )}
        <select
          id="select-doc_type"
          name="select-doc_type"
          onBlur={documentTypeBlurHandler}
          value={documentType}
          onChange={changeDocumentType}
        >
          <option selected={documentType === 1} value="1">
            Cédula de Ciudadanía
          </option>
          <option selected={documentType === 2} value="2">
            Cédula extranjera
          </option>
        </select>
        {documentTypeHasError && (
          <p className="edit-user__form-error">
            Por favor, seleccione un tipo de documento
          </p>
        )}
        <input
          type="text"
          value={documentId}
          onChange={changeDocumentId}
          onBlur={documentIdBlurHandler}
          placeholder="Documento"
        />
        {documentIdHasError && (
          <p className="edit-user__form-error">
            Por favor, ingrese su documento de identidad
          </p>
        )}
        <input
          value={email}
          onChange={changeEmail}
          onBlur={emailBlurHandler}
          placeholder="Correo"
        />
        {emailHasError && (
          <p className="edit-user__form-error">
            Por favor, ingrese un email válido
          </p>
        )}
        {!showPassword && !create && (
          <div className="d-flex justify-content-center">
            <button
              className="button-password"
              type="button"
              onClick={() => setShowPassword(true)}
            >
              Cambiar contraseña
            </button>
          </div>
        )}
        {(showPassword || create) && (
          <input
            placeholder="Nueva Contraseña"
            value={password}
            type="password"
            onBlur={passwordBlurHandler}
            onChange={changePassword}
          />
        )}
        {showPassword && (
          <div className="d-flex justify-content-center">
            <button
              className="button-password"
              type="button"
              onClick={() => setShowPassword(false)}
            >
              Cancelar cambio
            </button>
          </div>
        )}
        {passwordHasError && (
          <p className="edit-user__form-error">
            Por favor, ingrese una nueva contraseña
          </p>
        )}
        <select
          id="select-rol"
          name="select-rol"
          onChange={changeRol}
          value={rol}
          onBlur={rolBlurHandler}
        >
          <option selected={+rol === 0} value="0">
            Empleado/Admin
          </option>
          <option selected={+rol === 1} value="1">
            Cliente
          </option>
        </select>
        {rolHasError && (
          <p className="edit-user__form-error">Por favor, seleccione un rol</p>
        )}
        <div className="edit-user__buttons d-flex justify-content-center mt-3">
          <button type="button" onClick={create ? closeCreate : closeEdit}>
            Cancelar
          </button>
          <button
            disabled={!formIsValid}
            type="button"
            onClick={() => setIsLoading(true)}
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
