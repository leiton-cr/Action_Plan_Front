import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const useAlerts = () => {
  const MySwal = withReactContent(Swal);

  const simpleAlert = (title: string, detail?: string) => {
    MySwal.fire({
      title: title,
      text: detail,
      confirmButtonText: "Accept",
      customClass: {
        confirmButton: "confirm-alert",
      },

      showCloseButton: true,
      showClass: {
        popup: "animate__animated animate__fadeInLeft",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutRight",
      },
    });
  };

  const promiseSimpleAlert = async (title: string, detail?: string) => {
    return new Promise<any>((res) => {
      MySwal.fire({
        title: title,
        text: detail,
        confirmButtonText: "Confirm",
        customClass: {
          confirmButton: "confirm-alert",
        },
        showCancelButton: false,
        showCloseButton: false,
        showClass: {
          popup: "animate__animated animate__fadeInLeft",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutRight",
        },
      }).then((response) => res(response));
    });
  };

  const promiseAlert = async (title: string, detail?: string, confirmText?:string, cancelText?:string) => {
    return new Promise<any>((res) => {
      MySwal.fire({
        title: title,
        text: detail,
        confirmButtonText: confirmText || "Yes, confirm",
        cancelButtonText: cancelText || "No, cancel",
        customClass: {
          cancelButton: "cancel-alert",
          confirmButton: "confirm-alert",
        },
        showCancelButton: true,
        showCloseButton: true,
        showClass: {
          popup: "animate__animated animate__fadeInLeft",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutRight",
        },
      }).then((response) => res(response));
    });
  };

  const toastAlert = (title: string, icon:"success" | "error" | "warning") => {
    MySwal.fire({
      title: title,
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 3500,
      timerProgressBar: true,
      icon: icon,
      showClass: {
        popup: "animate__animated animate__fadeInRight",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutRight",
      },
    });
  };

  return { simpleAlert, promiseAlert, toastAlert, promiseSimpleAlert };
};

export default useAlerts;
