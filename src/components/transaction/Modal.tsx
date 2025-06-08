
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose} // Handle hardware back button on Android
        >
            <View className="flex-1">
                {/* Add a transparent background to capture touches outside modal content */}
                {/* <Pressable
                    className="flex-1 bg-black/50" // Semi-transparent backdrop
                    onPress={onClose} // Close modal when tapping outside
                /> */}
                <View className="h-[50%]  w-full bg-[#25292e] rounded-t-3xl absolute bottom-0">
                    <View className="h-10 bg-[#464C55] rounded-t-2xl px-5 flex-row items-center justify-between">
                        <Text className="text-white text-base">Choose a sticker</Text>
                        <Pressable
                            onPress={() => {
                                console.log('Close button pressed'); // Debug log
                                onClose();
                            }}
                            className="p-2" // Add padding for larger touch area
                        >
                            <MaterialIcons name="close" color="#fff" size={22} />
                        </Pressable>
                    </View>

                    <View className="px-5 pt-5 pb-10">
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    );
}