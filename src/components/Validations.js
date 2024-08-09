import { showMessage } from 'react-native-flash-message';
import * as yup from 'yup';

const noSpecialChars = /^[a-zA-Z0-9]+$/;
const panCardFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const gstinFormat =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/;
const fssaiFormat = /^[0-9]{14}$/;

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
  companyPhone: yup
    .string()
    .required('Company phone number is required')
    .min(
      10,
      ({min}) => `Company Phone Number must be at least ${min} characters`,
    ),
});
export const kycShema = yup.object().shape({
  aadharNo: yup
    .string()
    .required('Aadhar card number is required')
    .min(12, ({min}) => `Aadhar card number must be ${min} characters`)
    .matches(
      noSpecialChars,
      'Aadhar card number cannot contain special characters',
    ),

  panNo: yup
    .string()
    .required('Pan card number is required')
    .min(10, ({min}) => `Pan card number must be ${min} characters`)
    .matches(
      panCardFormat,
      'PAN card number must be in the format AAAAA9999A and in uppercase',
    ),

  gstinNo: yup
    .string()
    .min(15, ({min}) => `GSTIN number must be ${min} characters`)
    .matches(
      gstinFormat,
      'GSTIN number must contains only numbers and uppercase letters',
    ),

  fssaiNo: yup
    .string()
    .matches(fssaiFormat, 'FSSAI license number must be exactly 14 digits'),
});

export const loginSchema = yup.object().shape({
  companyId: yup.string().required('Company ID is required'),
  password: yup.string().required('Password is required'),
});
export const branchSchema = yup.object().shape({
  serviceName: yup.string().required('Service Name is required'),
  personName: yup.string().required('Person Name is required'),
  phone: yup
    .string()
    .required('Phone Number is required')
    .min(10, ({min}) => `Phone Number must be at least ${min} characters`),
});

export const PackageValidations =async values => {
  if (!values.maxPlatesCap) {
    showMessage({
      message: 'Request Failed!',
      description: 'Maximum Capacity is required.',
      type: 'danger',
    });
    return false;
  } else if (!values.miniPlatesCap) {
    showMessage({
      message: 'Request Failed!',
      description: 'Minimum Capacity is required.',
      type: 'danger',
    });
    return false;
  } 
  if(values?.miniPlatesCap>values?.maxPlatesCap){
    showMessage({
      message: 'Request Failed!',
      description: 'Maximum Capacity should always greater then Minimum Capacity.',
      type: 'danger',
    });
    return false;
  }
  else if (!values.minPrice) {
    showMessage({
      message: 'Request Failed!',
      description: 'Starting Price is required.',
      type: 'danger',
    });
    return false;
  } else {
    return true;
  }
};

export const BusinessProfileValidation=async(data,profile,ref)=>{
  
 
  if(!profile?.cateringName){
    showMessage({
      message: 'Request Failed!',
      description: 'Catering name is required.',
      type: 'danger',
    });
    return false;
  }
  else if(!profile?.contactPersonName){
    showMessage({
      message: 'Request Failed!',
      description: 'Contact person name is required.',
      type: 'danger',
    });
    return false;
  }
  
  // else if(!profile?.workingDays){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Working days/hours is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  // else if(!profile?.staffs){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Total Staffs is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  // else if(!profile?.about){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'About is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  // else if(!profile?.since){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Working Since is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  // else if(!profile?.bEmail){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Business Email Id is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  else if(!profile?.bPhone){
    showMessage({
      message: 'Request Failed!',
      description: 'Business Phone Number is required.',
      type: 'danger',
    });
    return false;
  }
  // else if(!profile?.landlineNumber){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Alternative Phone Number is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  // else if(!profile?.whatsappNumber){
  //   showMessage({
  //     message: 'Request Failed!',
  //     description: 'Whatsapp Number is required.',
  //     type: 'danger',
  //   });
  //   return false;
  // }
  else{
    return true
  }

}
