import { Dimensions, ToastAndroid } from "react-native"
const { width, height } = Dimensions.get("window")
import * as Clipboard from 'expo-clipboard';

const wp = (value) => {
    return width * value / 100
}

const hp = (value) => {
    return height * value / 100
}

const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show('Copied', ToastAndroid.SHORT, ToastAndroid.CENTER);
};

export { wp, hp, copyToClipboard }