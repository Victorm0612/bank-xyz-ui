import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createLocation,
  updateOldLocation
} from '../../../../helper/httpHelpers/locationsHttp';
import useForm from '../../../../hooks/useForm';
import { toastActions } from '../../../../store/toast';

const EditLocationForm = ({
  location,
  closeCreate,
  closeEdit,
  create = false
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // locationName input
  const {
    value: locationName,
    isValid: locationNameIsValid,
    hasError: locationNameHasError,
    changeInputValueHandler: changeLocationName,
    inputBlurHandler: locationNameBlurHandler,
    setInputValue: setLocationName
  } = useForm((val) => val.trim().length !== 0);

  useEffect(() => {
    const createNewLocation = async () => {
      try {
        await createLocation(token, locationName);
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

    const updateLocation = async () => {
      try {
        await updateOldLocation(token, {
          id: location.id,
          name: locationName
        });
        dispatch(
          toastActions.setInfo({
            title: 'Success',
            text: 'Se ha creado satisfactoriamente',
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

    if (isLoading && !create) return updateLocation();
    if (isLoading && create) return createNewLocation();
  }, [
    closeCreate,
    closeEdit,
    create,
    dispatch,
    isLoading,
    location,
    locationName,
    token
  ]);

  useEffect(() => {
    if (create) return;
    setLocationName(location.locationName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-user card p-3">
      <h2>{create ? 'Nueva sede' : 'Editar sede'}</h2>
      <form className="edit-user__form d-flex justify-content-center align-items center flex-column">
        <input
          type="text"
          value={locationName}
          onChange={changeLocationName}
          onBlur={locationNameBlurHandler}
          placeholder="Nombre de la sede"
        />
        {locationNameHasError && (
          <p className="edit-user__form-error">Por favor, ingrese un nombre</p>
        )}
        <div className="edit-user__buttons d-flex justify-content-center mt-3">
          <button type="button" onClick={create ? closeCreate : closeEdit}>
            Cancelar
          </button>
          <button
            disabled={!locationNameIsValid}
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

export default EditLocationForm;
