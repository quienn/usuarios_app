import { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Appbar, TextInput, Button, Text } from 'react-native-paper';
import { User, getUsers } from '../models/user';

export default function Page() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Iniciar Sesión" />
            </Appbar.Header>


            <View style={{ padding: 16 }}>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={{ marginBottom: 16 }}
                />
                <TextInput
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    style={{ marginBottom: 16 }}
                />
                <Button
                    mode="contained"
                    onPress={() => {
                        const user = users.find((user) => user.email === email && user.password === password)
                        if (user) {
                            alert('¡Bienvenido!');
                            router.replace('/users');
                        } else {
                            alert('Usuario o contraseña incorrectos')
                        }
                    }}
                >
                    Iniciar Sesión
                </Button>
            </View>
        </>
    )
}
