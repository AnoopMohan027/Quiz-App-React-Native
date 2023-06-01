import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export const COLORS = {
    primary: '#252c4a',
    secondary: '#1E90FF',
    accent: '#3498db',

    sucess: '#00C851',
    error: '#ff4444',

    black: '#17171',
    white: '#fff',
    background: '#252C4A'
}

export const SIZE = {
    base: 10,
    width,
    height
}