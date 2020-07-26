import { StyleSheet } from 'react-native';
import colors from './colors';

// Estilos para SplashScreen
const splashStyle = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.WHITE
    }
});

// Estilos para LoginScreen
const loginStyles = StyleSheet.create({

    container : {
        flex: 1,
        alignItems: 'center',
    },

    logo: {
        paddingTop: 50,
        alignItems: 'center',
    },

});

// Estilos para HomeScreen
const homeScreenStyles = StyleSheet.create({
    rowView : {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
})

// Estilos para HomeCard
const homeCardStyles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },

    button: {
        backgroundColor: colors.PRIMARYCOLOR
    },

    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: colors.WHITE      
    },

    cardImage: {
        height:100,
        width:100,
    }
});

// Styles para el map
const mapStyles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 460,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    smallContainer:{
        height: 180,
        width: 300,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });

export { splashStyle, loginStyles, homeScreenStyles, homeCardStyles, mapStyles };