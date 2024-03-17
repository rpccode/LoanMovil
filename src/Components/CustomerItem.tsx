import { StyleSheet, Text, View } from "react-native";
import { calculateShadowRadius, moderateScale } from "./utils/Utils";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Customer } from "../interfaces";
import Icon from 'react-native-vector-icons/MaterialIcons'

export const CustomerItem = ({ item } :{item:Customer}) => (
    <View style={styles.mainCardView}>
        <View style={styles.subCardView}>
            {/* <Text style={styles.infoIdText}>{ item.DNI}</Text> */}
            <Icon name='person' color='#F44336' size={50} />
        </View>
        <View style={{ marginLeft: moderateScale(10), flex: 1 }}>
            <Text style={styles.nameText}>{item.FirstName} {item.LastName}</Text>
            <View style={styles.emailContainer}>
                <Text style={styles.emailText}>Email: {item.Email}</Text>
                <Text style={styles.emailText}>Teléfono: {item.Telefono}</Text>
            </View>
        </View>
        
    </View>
);

const styles = StyleSheet.create({
    mainCardView: {
        height: moderateScale(90),
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: calculateShadowRadius(15),
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: calculateShadowRadius(8),
        elevation: 8,
        flexDirection: 'row',
        paddingVertical: moderateScale(6),
        paddingHorizontal: moderateScale(16),
        marginHorizontal: moderateScale(5),
        marginTop: moderateScale(6),
        marginBottom: moderateScale(6),
    },
    subCardView: {
        height: moderateScale(50),
        width: moderateScale(50),
        borderRadius: calculateShadowRadius(25),
        backgroundColor: Colors.history_back,
        borderColor: Colors.color_eeeeee,
        borderWidth: 1,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: calculateShadowRadius(14),
        color: Colors.black,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    emailContainer: {
        marginTop: moderateScale(4),
        width: '100%',
    },
    emailText: {
        color: Colors.gray,
        fontSize: calculateShadowRadius(12),
    },
    infoIdText: {
        color: Colors.black,
    },
});
