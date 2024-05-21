import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from './firebase-config';

initializeApp(firebaseConfig);
const db = getFirestore();

export default function Perfil() {
    const [userData, setUserData] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                try {
                    // Obtener los datos del usuario desde Firestore
                    const docRef = doc(db, "Medicos", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (e) {
                    console.error("Error fetching user data: ", e);
                }
            }
        };
        fetchUserData();
    }, [user]);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: userData.photoURL || 'https://cdn-icons-png.flaticon.com/512/6007/6007346.png' }} style={styles.profilePicture} />
            <Text style={styles.label}>Nombre: {userData.nombre}</Text>
            <Text style={styles.label}>E-mail: {userData.email}</Text>
            <Text style={styles.label}>Especialidad: {userData.especialidad}</Text>
            <Text style={styles.label}>Número de Celular: {userData.numeroCelular}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#fff",
        marginBottom: 30,
    },
    label: {
        fontSize: 17,
        fontWeight: '400',
        color: 'black',
        marginVertical: 5,
    },
});
