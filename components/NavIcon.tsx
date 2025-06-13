import Feather from '@expo/vector-icons/Feather';

export default function NavIcon({
    routeName,
    size=24,
    isFocused,
    activeColor,
    inactiveColor,
}: {
    routeName: string,
    size?:number,
    isFocused: boolean,
    activeColor?: string,
    inactiveColor?: string,
}) {
    switch (routeName) {
        case 'index':
            return <Feather name='home' size={size} color={isFocused ? activeColor : inactiveColor} />;
        case 'search':
            return <Feather name='search' size={size} color={isFocused ? activeColor : inactiveColor} />;
        case 'settings':
            return <Feather name='settings' size={size} color={isFocused ? activeColor : inactiveColor} />; 
        default:
            return <Feather name='home' size={size} color={isFocused ? activeColor : inactiveColor} />;
    }
}