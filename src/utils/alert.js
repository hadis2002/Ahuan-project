import Swal from "sweetalert2";

export const showAlert = async (message, icon = 'success') => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: "#333",
    color: "#fff",
    padding: "1rem 1.5rem",
    customClass: {
      popup: "rounded-xl shadow-lg",
      title: "text-base font-semibold",
      timerProgressBar: "bg-pink-500"
    },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer)
      toast.addEventListener("mouseleave", Swal.resumeTimer)
    }
  });

  await toast.fire({
    icon: icon,
    title: message,
  });
};
