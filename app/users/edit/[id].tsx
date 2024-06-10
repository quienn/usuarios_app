import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Appbar, TextInput, Button } from 'react-native-paper';
import { User, getUser, updateUser } from '../../../models/user';

export default function Page() {
    const { id } = useLocalSearchParams();

    const [user, setUser] = useState<User | null>(null);

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (id) {
            getUser(Number(id)).then(user => {
                setUser(user);
                setNickname(user.nickname);
                setEmail(user.email);
                setPassword(user.password);
            });
        }
    }, [id]);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={`Editando a ${user?.nickname}`} />
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
                        if (user) {
                            user.nickname = nickname;
                            user.email = email;
                            user.password = password;
                        }

                        updateUser(Number(id), user!).then(() => {
                            router.back();
                        });
                    }}
                >
                    Guardar
                </Button>
            </View>
        </>
    );
}
