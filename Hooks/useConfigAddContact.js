import useEmailValidator from './Validators/useEmailValidator';
import usePhoneNumberValidator from './Validators/usePhoneNumberValidator';
import EmailIcon from 'react-native-vector-icons/AntDesign';
import PhoneIcon from 'react-native-vector-icons/Feather';

function useConfigAddContact() {
  return [
    {
      lable: <EmailIcon name="mail" size={20} color="#058095" />,
      state: 'email',
      placeHolder: 'Contact Email',
      validator: useEmailValidator,
      styleLabel: {paddingRight: '2%'},
      styleInput: {borderBottomWidth: 1, flex: 1, borderBottomColor: 'gray'},
    },
    {
      lable: <PhoneIcon name="phone" size={20} color="#058095" />,
      placeHolder: '+962',
      state: 'phone',
      validator: usePhoneNumberValidator,
      styleInput: {borderBottomWidth: 1, flex: 1, borderBottomColor: 'gray'},
      styleLabel: {paddingRight: '2%'},
    },
  ];
}
export default useConfigAddContact;
