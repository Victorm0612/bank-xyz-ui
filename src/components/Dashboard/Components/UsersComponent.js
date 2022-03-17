import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconEdit from '../../../assets/icons/IconEdit';
import IconTrash from '../../../assets/icons/IconTrash';
import { deleteUser, getAllUsers } from '../../../helper/httpHelpers/usersHttp';
import { toastActions } from '../../../store/toast';
import BackDropComponent from '../../UI/BackdropComponent';
import DashboardComponent from '../DashboardComponent';
import spinner from '../../../assets/spinner.svg';
import EditUserForm from './EditUserForm';
import './UsersComponent.scss';

const UsersComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersList, setUsersList] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const closeEditUserForm = () => {
    setShowEdit(false);
    setIsLoading(true);
  };

  const closeCreateUserForm = () => {
    setShowCreate(false);
    setIsLoading(true);
  };

  const closeDeleteUserForm = () => {
    setShowDelete(false);
    setIsLoading(true);
  };

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const data = await getAllUsers(token);
        setUsersList(data);
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
    getUsersList();
  }, [dispatch, isLoading, token]);

  useEffect(() => {
    const deleteUserSelected = async () => {
      try {
        await deleteUser(token, userSelected.id);
        const data = await getAllUsers(token);
        setUsersList(data);
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
        closeDeleteUserForm();
      }
    };
    if (isLoading && showDelete) return deleteUserSelected();
  }, [dispatch, isLoading, showDelete, token, userSelected]);

  return (
    <DashboardComponent>
      {isLoading && !showCreate && !showEdit && !showDelete && (
        <BackDropComponent>
          <img src={spinner} alt="loading-data" />
        </BackDropComponent>
      )}
      {showCreate && (
        <BackDropComponent>
          <EditUserForm closeCreate={closeCreateUserForm} create />
        </BackDropComponent>
      )}
      {showEdit && (
        <BackDropComponent>
          <EditUserForm
            user={userSelected}
            closeEdit={closeEditUserForm}
            create={false}
          />
        </BackDropComponent>
      )}
      {showDelete && (
        <BackDropComponent>
          <div className="card text-center delete-card">
            <h2>¿Desea eliminar este usuario?</h2>
            <div className="delete-card__buttons d-flex justify-content-center align-items-center">
              <button type="button" onClick={closeDeleteUserForm}>
                Cancelar
              </button>
              <button type="button" onClick={() => setIsLoading(true)}>
                Aceptar
              </button>
            </div>
          </div>
        </BackDropComponent>
      )}
      <div className="users-list">
        <h1 className="users-list__title">Gestión de usuarios</h1>
        <div className="users-list__create d-flex justify-content-end m-3">
          <button type="button" onClick={() => setShowCreate(true)}>
            Crear usuario
          </button>
        </div>
        <div className="users-list__card card">
          <table className="users-list__table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role ? 'Cliente' : 'Empleado/Admin'}</td>
                  <td className="users-list__table-options">
                    <IconEdit
                      action={() => {
                        setUserSelected(user);
                        setShowEdit(true);
                      }}
                    />
                    <IconTrash
                      action={() => {
                        setUserSelected(user);
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

export default UsersComponent;
