const seasonSwal = Swal.mixin({
  background: "#0E0F13",
  color: "#EDEDED",
  iconColor: "#0d6efd",
  confirmButtonColor: "#0d6efd",
  cancelButtonColor: "#6c757d",
  buttonsStyling: true,
  customClass: {
    popup: "season-swal",
    title: "season-swal-title",
    htmlContainer: "season-swal-text",
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-outline-light"
  }
});

function swalSuccess(title, text = "") {
  seasonSwal.fire({
    icon: "success",
    title,
    text,
    timer: 1200,
    showConfirmButton: false
  });
}

function swalWarn(title, text = "") {
  seasonSwal.fire({
    icon: "warning",
    title,
    text
  });
}