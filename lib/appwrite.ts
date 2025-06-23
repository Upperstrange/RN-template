import { ENDPOINT, PLATFORM, PROJECTID } from '@/lib/safe-env';
import { Account, Client } from 'react-native-appwrite';


const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECTID).setPlatform(PLATFORM);

export const account = new Account(client);