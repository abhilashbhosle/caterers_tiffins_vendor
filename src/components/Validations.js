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
  serviceName: yup
  .string().required('Service Name is required'),
  companyPhone: yup.string().required('Company phone number is required')
  .min(10, ({min}) => `Company Phone Number must be at least ${min} characters`)
  ,
});

export const kycShema = yup.object().shape({
  aadharNo: yup.string().required('Aadhar card number is required')
  .min(12, ({min}) => `Aadhar card number must be ${min} characters`)
  ,
  panNo: yup.string().required('Pan card number is required')
  .min(10, ({min}) => `Pan card number must be ${min} characters`)
  ,
});

export const loginSchema = yup.object().shape({
  companyId: yup.string().required('Company ID is required'),
  password: yup.string().required('Password is required'),
});
export const branchSchema = yup.object().shape({
  serviceName: yup.string().required('Service Name is required'),
  personName: yup.string().required('Person Name is required'),
  phone: yup.string().required('Phone Number is required')
  .min(10, ({min}) => `Phone Number must be at least ${min} characters`)
  ,
});