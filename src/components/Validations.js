import * as yup from 'yup';
export const registrationScheme = yup.object().shape({
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .min(10, ({min}) => `Phone Number must be at least ${min} characters`)
    .required('Phone Number is required'),
});

export const profileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  serviceName: yup.string().required('Service Name is required'),
  companyPhone: yup.string().required('Company phone number is required'),
});

export const kycShema = yup.object().shape({
  aadharNo: yup.string().required('Aadhar card number is required'),
  panNo: yup.string().required('Pan card number is required'),
});

export const loginSchema = yup.object().shape({
  companyId: yup.string().required('Company ID is required'),
  password: yup.string().required('Password is required'),
});
