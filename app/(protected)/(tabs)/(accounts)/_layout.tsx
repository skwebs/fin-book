import { Stack } from 'expo-router'
import React from 'react'

const AccountLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Account" }} />
        </Stack>
    )
}

export default AccountLayout