import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { BlurView } from 'expo-blur';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase-config';
import { getFirestore, setDoc, doc } from "firebase/firestore";

const uri = 'https://ak.picdn.net/shutterstock/videos/1060308725/thumb/1.jpg';
const profilePicture = 'https://cdn-icons-png.flaticon.com/512/6007/6007346.png';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Registrarse({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [especialidad, setEspecialidad] = useState('');
    const [numeroCelular, setNumeroCelular] = useState('');

    const auth = getAuth(app);

    const handleCreateAccount = () => {
        // Verificar si las contraseñas coinciden
        if (password !== confirmPassword) {
            Alert.alert("Error", "Las contraseñas no coinciden");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                console.log('Account created!');
                const user = userCredential.user;
                console.log(user);

                // Guardar los datos adicionales en Firestore usando el UID del usuario
                await setDoc(doc(db, "Medicos", user.uid), {
                    nombre: nombre,
                    email: email,
                    especialidad: especialidad,
                    numeroCelular: numeroCelular
                });

                navigation.navigate("Login");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                Alert.alert("Error", errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
            <View style={{width:100, height:100, backgroundColor:'purple', position:'absolute'}}></View>
            <View style={{width:100, height:100, backgroundColor:'blue', top:120, position:'absolute', transform:[{rotate:'25deg'}] }}></View>
            <View style={{width:100, height:100, backgroundColor:'red', bottom:120, position:'absolute', borderRadius:50, transform:[{rotate:'25deg'}] }}></View>
            <ScrollView contentContainerStyle={{
                flex: 1,
                width: '100%',
                height: '100%',
                alignContent: "center",
                justifyContent: "center",
            }}>
                <BlurView intensity={100} style={styles.blurView}>
                    <View style={styles.login}>
                        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                        <View>
                            <Text style={styles.label}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre del doctor"
                                placeholderTextColor="black"
                                value={nombre}
                                onChangeText={text => setNombre(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="betomoedano@outlook.com"
                                placeholderTextColor="black"
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="black"
                                secureTextEntry={true}
                                value={password}
                                onChangeText={text => setPassword(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Confirmar Contraseña</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirmar contraseña"
                                placeholderTextColor="black"
                                secureTextEntry={true}
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Especialidad</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Especialidad del doctor"
                                placeholderTextColor="black"
                                value={especialidad}
                                onChangeText={text => setEspecialidad(text)}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Número de Celular</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Número de celular"
                                placeholderTextColor="black"
                                value={numeroCelular}
                                onChangeText={text => setNumeroCelular(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
                            <Text style={styles.buttonText}>Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    blurView: {
        padding: 20,
        borderRadius: 10,
    },
    login: {
        width: 350,
        height: 600, // Aumenta la altura para dar espacio a los nuevos campos
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        alignItems: "center"
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#fff",
        marginVertical: 30,
    },
    label: {
        fontSize: 17,
        fontWeight: '400',
        color: 'white',
        marginBottom: 5,
    },
    input: {
        width: 250,
        height: 40,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 20,
        color: 'black',
    },
    button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#00CFEB90",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '400',
    },
});
