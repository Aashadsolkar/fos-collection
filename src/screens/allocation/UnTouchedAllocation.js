import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Text,
} from "react-native";

import AllocationCard from "../../components/allocation/AllocationCard";
import { useAllocation } from "../../context/AllocationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/common/AppHeader";

export default function UnTouchedAllocation({ navigation }) {
    const {
        allocations,
        filter,
        fetchAllocations,
        loadMore,
    } = useAllocation();

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchAllocations("", 1, false, 0);
    }, [filter]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAllocations("", 1, true, 0);
        setRefreshing(false);
    };

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}></SafeAreaView>
            <SafeAreaView edges={["bottom"]}>
                <AppHeader title={"Allocation"} />
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>Untouched Allocation</Text>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={allocations}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <AllocationCard
                                item={item}
                                onPress={() =>
                                    navigation.navigate("AllocationDetails", {
                                        id: item.id
                                    })
                                }
                            />
                        )}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                        onEndReached={() => loadMore("", 0)}
                        onEndReachedThreshold={0.3}
                        ListEmptyComponent={
                            <Text style={{ textAlign: "center", marginTop: 40 }}>
                                No Allocations Found
                            </Text>
                        }
                    />
                </View>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        backgroundColor: "#f5f5f5",
    },
    headingContainer: {
        marginVertical: 12,
        paddingHorizontal: 16,
    },
    headingText: {
        fontSize: 18,        // 👈 mobile friendly heading
        fontWeight: "700",   // bold
        color: "#222",       // dark text
    },
});