import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Appbar, FAB, Card, Text, Divider, Dialog, Button, Portal } from 'react-native-paper';
import { User, getUser, deleteUser } from '../../models/user';

export default function Page() {
    const { id } = useLocalSearchParams();

    const [user, setUser] = useState<User | null>(null);

    const [dialogVisible, setDialogVisible] = useState(false);

    useEffect(() => {
        if (id) {
            getUser(Number(id)).then(user => {
                setUser(user || null);
            });
        }
    }, [id]);

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => router.back()} />
                <Appbar.Content title={`Información de ${user?.nickname}`} />
            </Appbar.Header>

            <Card>
                <Card.Title title="Datos de Usuario" />
                <Card.Content>
                    <Text>Nombre: {user?.nickname}</Text>
                    <Divider />
                    <Text>Correo: {user?.email}</Text>
                    <Divider />
                </Card.Content>
            </Card>

            <FAB
                style={styles.fab}
                icon="pencil"
                onPress={() => router.navigate(`/users/edit/${id}`)}
            />

            <FAB
                style={styles.fabDelete}
                icon="delete"
                onPress={() => {
                    setDialogVisible(true);
                }} />

            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
                    <Dialog.Title>Eliminar a {user?.nickname}</Dialog.Title>
                    <Dialog.Content>
                        <Text>¿Estás seguro de que deseas eliminar este usuario?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
                        <Button onPress={() => {
                            if (id) {
                                deleteUser(Number(id)).then(() => {
                                    setDialogVisible(false);
                                    router.navigate('/users');
                                });
                            }
                        }}>Eliminar</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    fabDelete: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 70,
    },
});
