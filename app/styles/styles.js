import { StyleSheet } from 'react-native';
import Colors from './colors';

// Estilos para SplashScreen
const splashStyle = StyleSheet.create({
    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.WHITE
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
        backgroundColor: Colors.PRIMARYCOLOR
    },

    image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',  
        backgroundColor: Colors.WHITE      
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
      flex: 1,
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
    button: {
      width: 250,
      height: 60,
      backgroundColor: Colors.AQUABLUE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginBottom:12
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 15,
      color: '#fff'
    },
    filterBtn : {
        position: 'absolute',
        width:50, height:50,
        backgroundColor: Colors.WHITE,
        borderRadius:30,
        bottom:20,right:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    favBtn : {
        position: 'absolute',
        width:50, height:50,
        backgroundColor: Colors.WHITE,
        borderRadius:30,
        bottom:80,right:20,
        alignItems: 'center',
        justifyContent:'center',
    },
   });

// Styles para la Details View
const detailsScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        padding: 15,
    },
    subContainer: {
        width: "100%",
        height: 20,
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10
    },
    favBtn : {
        position: 'absolute',
        width:50, height:50,
        backgroundColor: Colors.WHITE,
        borderRadius:30,
        top:250,right:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    addRecuerdoBtn : {
        width:35, height:35,
        backgroundColor: Colors.SKYBLUE,
        borderRadius:30,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 10,       
    },
    button: {
      width: 250,
      height: 60,
      backgroundColor: Colors.AQUABLUE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginBottom:12
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 15,
      color: '#fff'
    },
});

const recuerdosScreenStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff'
    },
    button: {
      width: 250,
      height: 60,
      backgroundColor: Colors.AQUABLUE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      marginBottom:12
    },
    buttonDelete : {
        width:35, height:35,
        backgroundColor: Colors.RED,
        borderRadius:30,
        alignItems: 'center',
        justifyContent:'center',
        marginTop: 10,       
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 15,
      color: '#fff'
    },
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      paddingTop: 30,
    },
    imageThumbnail: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
    },
    imageStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 100,
      flex: 1,
      margin: 1,
    },
  });

export { splashStyle, loginStyles, homeScreenStyles, homeCardStyles, mapStyles, detailsScreenStyles, recuerdosScreenStyles };