import { Stack } from 'expo-router'
import React from 'react'

const DashboardLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Dashboard" }} />
        </Stack>
    )
}

export default DashboardLayout