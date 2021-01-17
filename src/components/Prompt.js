import Swal from 'sweetalert2';
import './prompt.scss';

const Prompt = Swal.mixin({
  showCancelButton: true,
  showCloseButton: true,
  buttonsStyling: false,
  reverseButtons: true,
  showLoaderOnConfirm: true,
  showClass: {
    popup: 'swal2-noanimation',
    backdrop: 'fade show',
  },
  customClass: {
    header: 'm-0 p-4 align-items-start',
    title: 'h5',
    confirmButton: 'btn btn-warning mb-4',
    cancelButton: 'btn mb-4',
    actions: 'modal-footer align-items-end',
    content: 'modal-body text-left border-bottom-1 p-4',
    popup: 'p-0',
  },
});

export default Prompt;