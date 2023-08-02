import React, { useState, useEffect } from 'react';
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import Cookies from 'js-cookie';
import axiosInstance from './axiosInstance';
import { useNavigate } from 'react-router-dom';

const SessionTimeout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timerRequest, setTimerRequest] = useState(null);
  const [timerWarning, setTimerWarning] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      if (token) {
        await axiosInstance.post('/logout');
        deleteAllCookies(); // Eliminar todas las cookies, incluida "infocart"
        console.log('Fuera del sistema');
        navigate('/'); // Redirigir a la página de inicio ("/")
      } else {
        console.log('No se encontró el token de acceso');
      }
    } catch (error) {
      console.log('Error en el logout:', error);
    }
  };

  const deleteAllCookies = () => {
    const cookies = Cookies.get();
    for (const cookie in cookies) {
      Cookies.remove(cookie);
    }
  };

  const resetRequestTimer = () => {
    if (timerRequest) {
      clearTimeout(timerRequest);
    }

    // Cambiar la duración del cronómetro para las peticiones aquí (en milisegundos)
    const durationForRequestsInMinutes = 30; // 30 minutos
    const durationForRequestsInMilliseconds = durationForRequestsInMinutes * 60 * 1000;

    const newRequestTimer = setTimeout(() => {
      // Realizar las peticiones aquí cuando termine el cronómetro
      handleLogout();
      const infocartCookie = Cookies.get('infocart');
      if (infocartCookie) {
        axiosInstance.delete('/api/cart/delete');
        console.log('Petición de eliminar carrito enviada');
      }
    }, durationForRequestsInMilliseconds);

    setTimerRequest(newRequestTimer);
  };

  const resetWarningTimer = () => {
    if (timerWarning) {
      clearTimeout(timerWarning);
    }

    // Cambiar la duración del cronómetro para mostrar la advertencia aquí (en milisegundos)
    const durationForWarningInSeconds = 1500; // 5 min
    const durationForWarningInMilliseconds = durationForWarningInSeconds * 1000;

    const newWarningTimer = setTimeout(() => {
      setShowWarning(true);
    }, durationForWarningInMilliseconds);

    setTimerWarning(newWarningTimer);
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      // Si no existe la cookie "token", no activamos el cronómetro
      return;
    }

    resetRequestTimer();
    resetWarningTimer();

    const handleUnload = (event) => {
      if (showWarning) {
        event.preventDefault();
        const confirmLogout = window.confirm('¡Vas a abandonar la página! ¿Estás seguro?');
        if (confirmLogout) {
          handleLogout();
          const infocartCookie = Cookies.get('infocart');
          if (infocartCookie) {
            axiosInstance.delete('/api/cart/delete');
            console.log('Petición de eliminar carrito enviada');
          }
          window.removeEventListener('beforeunload', handleUnload);
          window.close();
        } else {
          event.returnValue = '';
        }
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      if (timerRequest) {
        clearTimeout(timerRequest);
      }
      if (timerWarning) {
        clearTimeout(timerWarning);
      }
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [showWarning]);

  const handleCloseModal = () => {
    setShowWarning(false);
  };

  return (
    <>
      {/* Modal de advertencia */}
      {showWarning && (
        <MDBModal show={showWarning} onHide={handleCloseModal} backdrop={false}>
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalBody>
                <h5>Su sesión terminará en 5 minutos</h5>
                <p>Por favor, finalice su compra o su carrito será descartado.</p>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      )}

      {/* Resto del componente */}
      {/* Aquí puedes colocar el contenido de tu aplicación */}
    </>
  );
};

export default SessionTimeout;
