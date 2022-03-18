import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackDropComponent from '../../../UI/BackdropComponent';
import DashboardComponent from '../../DashboardComponent';
import spinner from '../../../../assets/spinner.svg';
import './LocationsComponent.scss';
import {
  deleteLocation,
  getLocations
} from '../../../../helper/httpHelpers/locationsHttp';
import { toastActions } from '../../../../store/toast';
import IconEdit from '../../../../assets/icons/IconEdit';
import IconTrash from '../../../../assets/icons/IconTrash';
import EditLocationForm from './EditLocationForm';

const LocationsComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [locationSelected, setLocationSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeEditLocationForm = () => {
    setShowEdit(false);
    setIsLoading(true);
  };

  const closeCreateLocationForm = () => {
    setShowCreate(false);
    setIsLoading(true);
  };

  const closeDeleteLocationForm = () => {
    setShowDelete(false);
    setIsLoading(true);
  };

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        const response = await getLocations(token);
        setLocations(response);
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

    if (!isLoading) return;
    getAllLocations();
  }, [dispatch, isLoading, token]);

  useEffect(() => {
    const deleteUserSelected = async () => {
      try {
        await deleteLocation(token, locationSelected.id);
        const data = await getLocations(token);
        setLocations(data);
        dispatch(
          toastActions.setInfo({
            title: 'Success',
            text: 'Se ha eliminado satisfactoriamente',
            type: 'success',
            show: true
          })
        );
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
        closeDeleteLocationForm();
      }
    };
    if (isLoading && showDelete) return deleteUserSelected();
  }, [dispatch, isLoading, locationSelected, showDelete, token]);

  return (
    <DashboardComponent>
      {isLoading && !showCreate && !showEdit && !showDelete && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {showCreate && (
        <BackDropComponent>
          <EditLocationForm closeCreate={closeCreateLocationForm} create />
        </BackDropComponent>
      )}
      {showEdit && (
        <BackDropComponent>
          <EditLocationForm
            location={locationSelected}
            closeEdit={closeEditLocationForm}
            create={false}
          />
        </BackDropComponent>
      )}
      {showDelete && (
        <BackDropComponent>
          <div className="card text-center delete-card">
            <h2>¿Desea eliminar esta sede?</h2>
            <div className="delete-card__buttons d-flex justify-content-center align-items-center">
              <button type="button" onClick={closeDeleteLocationForm}>
                Cancelar
              </button>
              <button type="button" onClick={() => setIsLoading(true)}>
                Aceptar
              </button>
            </div>
          </div>
        </BackDropComponent>
      )}
      <div className="locations-list">
        <h1 className="locations-list__title">Gestión de Sedes</h1>
        <div className="locations-list__create d-flex justify-content-end m-3">
          <button type="button" onClick={() => setShowCreate(true)}>
            Crear Sede
          </button>
        </div>
        <div className="locations-list__card card">
          <table className="locations-list__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location.id}>
                  <td>{location.id}</td>
                  <td>{location.locationName}</td>
                  <td className="locations-list__table-options">
                    <IconEdit
                      action={() => {
                        setLocationSelected(location);
                        setShowEdit(true);
                      }}
                    />
                    <IconTrash
                      action={() => {
                        setLocationSelected(location);
                        setShowDelete(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardComponent>
  );
};

export default LocationsComponent;
