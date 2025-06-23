import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
        color: '#1f2937',
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
        fontSize: 18,
        borderRadius: 9999,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        marginLeft: 16,
        marginTop: 8,
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
        marginTop: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: [{ translateY: -12 }],
    },
    button: {
        width: '100%',
        backgroundColor: '#3b82f6',
        padding: 12,
        borderRadius: 9999,
        alignItems: 'center',
        marginTop: 24,
    },
});

export default styles