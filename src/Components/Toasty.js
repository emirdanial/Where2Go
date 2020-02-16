import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const notifyWarning = () => {
  toast.error("Something went wrong. Please try again later.", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyErrorText = (errorInfo) => {
  toast.error( errorInfo , {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyPromoSuccess= () => {
  toast.success("Promo successfully added!", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyPromoDeleted= () => {
  toast.success("Promo successfully deleted!", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyPromoUpdated= () => {
  toast.success("Promo successfully updated!", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyProfileUpdated= () => {
  toast.success("Profile updated!", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};

export const notifyTokenExpired= () => {
  toast.warning("Token expired. Please refresh the page.", {
	hideProgressBar: true,
	closeOnClick: true,
  });
};