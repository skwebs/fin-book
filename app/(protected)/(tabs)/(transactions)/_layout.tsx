import { Stack } from 'expo-router'
import React from 'react'

const TransactionsLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Transactions" }} />
        </Stack>
    )
}

export default TransactionsLayout