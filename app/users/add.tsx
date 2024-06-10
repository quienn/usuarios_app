import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { User, getUsers, createUser } from '../../models/user';

export default function Page() {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title="Nuevo Usuario" />
            </Appbar.Header>


            <View style={{ padding: 16 }}>
                <TextInput
                    label="Nickname"
                    value={nickname}
                    onChangeText={setNickname}
                    style={{ marginBottom: 16 }}
                />
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={{ marginBottom: 16 }}
                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    style={{ marginBottom: 16 }}
                />
                <Button
                    mode="contained"
                    onPress={() => {
                        createUser({ nickname, email, password }).then(() => {
                            router.back();
                        });
                    }}
                >
                    Salvar
                </Button>
            </View>
        </>
    );
}
