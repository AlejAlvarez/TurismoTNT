import {StyleSheet} from 'react-native';
import Colors from './colors';

// Estilos para SplashScreen
const splashStyle = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },
});

// Estilos para HomeScreen
const homeScreenStyles = StyleSheet.create({
  rowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatBtn: {
    width: 40,
    height: 40,
    right: 10,
  },
});

// Estilos para HomeCard
const homeCardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    backgroundColor: Colors.PRIMARYCOLOR,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
  },

  cardImage: {
    height: 100,
    width: 100,
  },
});

// Styles para el map
const mapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  smallContainer: {
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
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  filterBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    bottom: 20,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
    bottom: 80,
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Styles para la Details View
const detailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
  },
  subContainer: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: 8,
  },
  mainImage: {
    width: 350,
    height: 200,
  },
  title: {
    paddingTop: 10,
  },
  subTitle: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 20
  },
  clasificacion: {
    fontSize: 12,
    fontStyle: 'italic'
  },
  direccion: {
    fontWeight: 'bold',
    paddingBottom: 8
  },
  marker: {
    padding: 5,
    borderRadius: 10,
    elevation: 3,
    shadowRadius: 2,
    shadowColor: 'black',
    shadowOffset: {width: 10, height: 10},
  },
  favBtn: {
    right: 10,
  },
  addRecuerdoBtn: {
    width: 40,
    height: 40,
    right: 14,
    top: 170,
    elevation: 2,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: Colors.AQUABLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

const recuerdosScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: Colors.AQUABLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonDelete: {
    width: 35,
    height: 35,
    backgroundColor: Colors.RED,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
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

const profileScreenStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  profileDataContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'},
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  exitButton: {
    marginTop: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  input: {
    marginVertical: 10,
  },
  inputText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  confirmButton: {
    marginVertical: 5,
  },
  dropButton: {
    color: Colors.RED,
    marginBottom: 10,
  },
});

const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    marginBottom: 26,
  },
  input: {
    marginVertical: 10,
  },
  loginButton: {
    marginVertical: 30,
  },
  registerButton: {
    marginVertical: 0,
  },
});

const registerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    marginBottom: 26,
  },
  input: {
    marginVertical: 10,
  },
  registerButton: {
    marginVertical: 30,
  },
});

/*
const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.AQUABLUE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  text: {
    color: Colors.WHITE,
    fontWeight: '500',
    fontSize: 16,
  }
});
*/

export {
  splashStyle,
  homeScreenStyles,
  homeCardStyles,
  mapStyles,
  detailsScreenStyles,
  recuerdosScreenStyles,
  profileScreenStyles,
  loginScreenStyles,
  registerScreenStyles,
};
