import {Image, Text, View} from 'react-native';
import Button from '../Components/Button';
import style from '../AppStyling';
import profilePic from '../Assets/contact-icon-empty.png';
import RemoveIcon from 'react-native-vector-icons/FontAwesome';
function useConfigContact(handleRemoveContact) {
  return user => {
    return (
      <View>
        <Button
          styleButton={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: '2%',
          }}
          styleText={style.submitFormButtonText}
          onPress={() => handleRemoveContact(user)}>
          <View>
            <Image
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
                borderRadius: 50,
                objectFit: 'contain',
                resizeMode: 'contain',
              }} // Adjust dimensions as needed
              source={
                user.avatar
                  ? {
                      uri: user.avatar,
                    }
                  : profilePic
              }
            />
            <View
              style={{
                alignSelf: 'center',
                borderRadius: 50,
                objectFit: 'contain',
                resizeMode: 'contain',
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: 'red',
              }}>
              <RemoveIcon name="remove" size={11} color="white" />
            </View>
          </View>

          <Text
            style={[
              style.conversationNameText,
              {fontSize: 10, paddingLeft: '1%'},
            ]}>
            {user.username}
          </Text>
        </Button>
      </View>
    );
  };
}

export default useConfigContact;
