import SignOutBtn from '@/components/AuthForm/SignOutBtn';
import { Text, View } from 'react-native';

const Home = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl">Hi mom!</Text>
      <SignOutBtn/>
    </View>
  )
}

export default Home