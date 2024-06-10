import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Appbar, FAB, List } from 'react-native-paper';
import { User, getUsers } from '../../models/user';

export default function Page() {
    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
        })
    }, []);

    return (
        <>
            <Appbar.Header>
                <Appbar.Content title="Lista de Usuarios" />
                <Appbar.Action icon="logout" onPress={() => router.replace('/')} />
            </Appbar.Header>

            <List.Section>
                {users.map((user) => (
                    <List.Item
                        key={user.id}
                        title={user.nickname}
                        description={user.email}
                        left={(props) => <List.Icon {...props} icon="account" />}
                        onPress={() => { router.navigate(`/users/${user.id}`) }}
                    />
                ))}
            </List.Section>

            <FAB icon="plus" style={styles.fab} onPress={() => { router.navigate('/users/add') }} />
        </>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
