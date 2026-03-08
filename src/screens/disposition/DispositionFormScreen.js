import DateTimePicker from "@react-native-community/datetimepicker";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import Input from "../../components/Input";
import { useDispositionForm } from "../../context/DispositionFormContext";
import AppInput from "../../components/form/AppInput";
import AppHeader from "../../components/common/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const visitStatusOptions = ["Contactable", "Non Contactable"];

const contactableDispositions = [
    "Fully paid",
    "Partially paid",
    "Promise to pay",
    "Refuse to pay",
    "On visit online payment",
    "Cheque received",
    "Vehicle details",
    "Vehicle sold",
    "Vehicle not available",
    "Any other remark",
    "Borrower abusive/aggressive",
];

const nonContactableDispositions = [
    "Door Closed",
    "Borrower Shifted",
    "Location Not Found",
    "Address Incorrect",
];

const collectionTypeOptions = {
    "Fully paid": ["Cheque", "DD", "Online"],
    "Partially paid": ["Cheque", "DD", "Online"],
    "Promise to pay": ["Reschedule"],
    "On visit online payment": ["Online"],
    "Cheque received": ["Cheque"],
};

// ---------- DateInput ----------
const DateInput = ({ value, onChange, placeholder }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState(value ? new Date(value) : new Date());

    const handleAndroidChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) onChange(selectedDate.toISOString().split("T")[0]);
    };

    const handleIOSConfirm = () => {
        setShowPicker(false);
        onChange(tempDate.toISOString().split("T")[0]);
    };

    const handleIOSCancel = () => {
        setShowPicker(false);
        setTempDate(value ? new Date(value) : new Date());
    };

    return (
        <>
            <TouchableOpacity
                onPress={() => setShowPicker(true)}
                activeOpacity={0.8}
                style={{ position: "relative", marginBottom: 10 }}
            >
                <AppInput
                    placeholder={placeholder}
                    value={value}
                    editable={false}
                />
                {/* <Icon
                    name="calendar-month"
                    size={24}
                    color="#333"
                    style={{
                        position: "absolute",
                        right: 10,
                        top: "40%",
                        transform: [{ translateY: -12 }],
                    }}
                /> */}
                <Ionicons name="calendar-outline" size={22} color="#000" style={{
                    position: "absolute",
                    right: 10,
                    top: "40%",
                    transform: [{ translateY: -12 }],
                }} />
            </TouchableOpacity>

            {showPicker && Platform.OS === "android" && (
                <DateTimePicker
                    value={value ? new Date(value) : new Date()}
                    mode="date"
                    display="default"
                    onChange={handleAndroidChange}
                    maximumDate={new Date(2100, 11, 31)}
                    minimumDate={new Date(1900, 0, 1)}
                />
            )}

            {showPicker && Platform.OS === "ios" && (
                <Modal transparent animationType="slide" visible={showPicker}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                    >
                        <View style={{ backgroundColor: "#fff", paddingBottom: 20 }}>
                            <DateTimePicker
                                value={tempDate}
                                mode="date"
                                display="spinner"
                                onChange={(event, selectedDate) =>
                                    selectedDate && setTempDate(selectedDate)
                                }
                                maximumDate={new Date(2100, 11, 31)}
                                minimumDate={new Date(1900, 0, 1)}
                                style={{ backgroundColor: "#fff" }}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 10,
                                    marginHorizontal: 10,
                                }}
                            >
                                <Button title="Cancel" onPress={handleIOSCancel} />
                                <Button title="Confirm" onPress={handleIOSConfirm} />
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
};

// ---------- Main Form ----------
const DispositionFormScreen = ({ navigation, route }) => {
    const { submitDisposition, loading } = useDispositionForm();
    const [formData, setFormData] = useState({
        visit_status: "",
        disposition: "",
        collection_type: "",
        amount: "",
        cheque_no: "",
        bank_name: "",
        cheque_date: "",
        receipt_no: "",
        transcation_id: "",
        followup_date: "",
        alt_mobile_no: "",
        alt_email_id: "",
        alt_address: "",
        remarks: "",
    });

    const [errors, setErrors] = useState([]);
    const scrollRef = useRef(null);
    const collectionRef = useRef(null);
    const amountRef = useRef(null);

    const [isApiCalling, setIsApiCalling] = useState(false);
    const { data } = route.params || {};

    const updateField = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (errors.includes(key)) setErrors((prev) => prev.filter((e) => e !== key));
    };

    useEffect(() => {
        const options = collectionTypeOptions[formData.disposition];
        if (options?.length === 1 && formData.collection_type !== options[0]) {
            updateField("collection_type", options[0]);
        }
    }, [formData.disposition]);

    // Inside your DispositionForm component
    const [image, setImage] = useState(null);

    // Function to pick image
    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();

            if (status !== "granted") {
                Alert.alert("Permission required", "Camera permission is required!");
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back, // back camera
                allowsEditing: false,
                quality: 0.7,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }

        } catch (error) {
            console.log("Camera error:", error);
        }
    };

    const requiredFields = useMemo(() => {
        const { visit_status, disposition, collection_type } = formData;
        let fields = ["remarks"];

        if (visit_status === "Contactable") {
            switch (disposition) {
                case "Fully paid":
                case "Partially paid":
                    if (!collection_type) return fields;
                    if (collection_type === "Cheque")
                        fields.push("amount", "cheque_no", "bank_name", "cheque_date");
                    if (collection_type === "DD") fields.push("amount", "receipt_no");
                    if (collection_type === "Online") fields.push("amount", "transcation_id");
                    break;
                case "Promise to pay":
                    fields.push("followup_date");
                    break;
                case "On visit online payment":
                    fields.push("amount", "transcation_id");
                    break;
                case "Cheque received":
                    fields.push("amount", "cheque_no", "bank_name", "cheque_date");
                    break;
                default:
                    break;
            }
        }
        return fields;
    }, [formData.visit_status, formData.disposition, formData.collection_type]);

    const canShowSubmit = useMemo(() => {
        if (!formData.visit_status || !formData.disposition) return false;
        const options = collectionTypeOptions[formData.disposition];
        if (!options) return true;
        if (options.length === 1) return true;
        return !!formData.collection_type;
    }, [formData.visit_status, formData.disposition, formData.collection_type]);

    const renderDropdown = (label, key, options) => (
        <View style={styles.dropdownBox}>
            <Text style={styles.label}>
                {label} <Text style={styles.star}>*</Text>
            </Text>
            <View style={styles.optionWrapper}>
                {options.map((item) => {
                    const selected = formData[key] === item;
                    return (
                        <TouchableOpacity
                            key={item}
                            style={[styles.option, selected && styles.optionSelected]}
                            onPress={() => {
                                updateField(key, item);
                                if (key === "visit_status") {
                                    updateField("disposition", "");
                                    updateField("collection_type", "");
                                } else if (key === "disposition") {
                                    updateField("collection_type", "");
                                    setTimeout(() => {
                                        if (collectionRef.current && scrollRef.current) {
                                            collectionRef.current.measure(
                                                (fx, fy, width, height, px, py) => {
                                                    scrollRef.current.scrollTo({ y: py, animated: true });
                                                }
                                            );
                                        }
                                    }, 300);
                                } else if (key === "collection_type") {
                                    setTimeout(() => {
                                        if (amountRef.current && scrollRef.current) {
                                            amountRef.current.measure(
                                                (fx, fy, width, height, px, py) => {
                                                    scrollRef.current.scrollTo({ y: py, animated: true });
                                                }
                                            );
                                        }
                                    }, 300);
                                }
                            }}
                        >
                            <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                                {item}
                            </Text>
                            {selected && (
                                // <Icon
                                //     name="check-circle"
                                //     size={20}
                                //     color={COLORS.primary || "#007AFF"}
                                // />
                                <Ionicons name="filter-outline" size={22} color="#000" />

                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    const getDispositions = () => {
        if (formData.visit_status === "Contactable") return contactableDispositions;
        if (formData.visit_status === "Non Contactable") return nonContactableDispositions;
        return [];
    };

    const renderInput = (field, placeholder, forwardedRef = null) => (
        <View style={{ marginBottom: 10 }} ref={forwardedRef}>
            <AppInput
                placeholder={requiredFields.includes(field) ? `${placeholder} *` : placeholder}
                value={formData[field]}
                onChangeText={(t) => updateField(field, t)}
            />
            {errors.includes(field) && (
                <Text style={{ color: "red", marginTop: 3, fontSize: 13 }}>
                    {placeholder} is required
                </Text>
            )}
        </View>
    );

    const handleOnlineLinkClick = () => {
        if (!formData.amount) {
            Alert.alert("Error", "Please fill the Amount before proceeding!");
            return;
        }
        const url = `https://example.com/payment?amount=${encodeURIComponent(formData.amount)}`;
        Linking.openURL(url).catch(() => Alert.alert("Error", "Cannot open URL"));
    };

    const handleSubmit = async () => {
        const missing = requiredFields.filter((field) => !formData[field]);

        if (missing.length > 0) {
            setErrors(missing);
            return;
        }

        const payload = {
            allocation_id: data?.id,
            process_id: 1,
            account_number: data?.account_no,
            visit_status:
                formData.visit_status === "Non Contactable"
                    ? "not-contactable"
                    : formData.visit_status.toLowerCase(),

            disposition: formData.disposition,
        };

        if (formData.alt_mobile_no) payload.alt_mobile_no = formData.alt_mobile_no;
        if (formData.alt_email_id) payload.alt_email_id = formData.alt_email_id;
        if (formData.alt_address) payload.alt_address = formData.alt_address;
        if (formData.remarks) payload.remarks = formData.remarks;

        if (formData.visit_status === "Contactable") {
            switch (formData.disposition) {
                case "Fully paid":
                case "Partially paid":
                    if (formData.collection_type) {
                        payload.collection_type = formData.collection_type;
                        payload.amount = formData.amount || "";
                        if (formData.collection_type === "Cheque") {
                            payload.cheque_no = formData.cheque_no;
                            payload.bank_name = formData.bank_name;
                            payload.cheque_date = formData.cheque_date;
                        } else if (formData.collection_type === "DD") {
                            payload.receipt_no = formData.receipt_no;
                        } else if (formData.collection_type === "Online") {
                            payload.transcation_id = formData.transcation_id;
                        }
                    }
                    break;
                case "Promise to pay":
                    payload.followup_date = formData.followup_date;
                    break;
                case "On visit online payment":
                    payload.amount = formData.amount;
                    payload.transcation_id = formData.transcation_id;
                    break;
                case "Cheque received":
                    payload.amount = formData.amount;
                    payload.cheque_no = formData.cheque_no;
                    payload.bank_name = formData.bank_name;
                    payload.cheque_date = formData.cheque_date;
                    break;
                default:
                    break;
            }
        }

        const formDataToSend = new FormData();

        // normal fields
        Object.keys(payload).forEach((key) => {
            formDataToSend.append(key, payload[key]);
        });

        // image add karo agar exist karti hai
        if (image) {
            formDataToSend.append("image", {
                uri: image,
                name: "disposition.jpg",
                type: "image/jpeg",
            });
        }

        try {
            setIsApiCalling(true)
            const response = await submitDisposition(formDataToSend);
            setIsApiCalling(false)
            navigation.navigate("MainTabs", {
                screen: "Disposition",
                params: { refresh: true },
            });
        } catch (error) {
            Alert.alert("Error", error.message || "Something went wrong!");
            setIsApiCalling(false);
        }
    };

    return (
        <>
            <SafeAreaView edges={["top"]} style={{ backgroundColor: "#fff" }}></SafeAreaView>
            <SafeAreaView edges={[]} style={styles.wrapper}>
                <AppHeader title={"Disposition Form"} />
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 0}
                >
                    <ScrollView
                        ref={scrollRef}
                        contentContainerStyle={[styles.container, { paddingBottom: 80 }]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Visit Status */}
                        <View style={styles.card}>
                            {renderDropdown("Visit Status", "visit_status", visitStatusOptions)}
                        </View>

                        {/* Disposition */}
                        {formData.visit_status && (
                            <View style={styles.card}>
                                {renderDropdown("Disposition", "disposition", getDispositions())}
                            </View>
                        )}

                        {/* Collection Type & Fields */}
                        {formData.visit_status && formData.disposition && (
                            <View ref={collectionRef} style={styles.card}>
                                {collectionTypeOptions[formData.disposition] &&
                                    collectionTypeOptions[formData.disposition].length > 1 &&
                                    renderDropdown(
                                        "Collection Type",
                                        "collection_type",
                                        collectionTypeOptions[formData.disposition]
                                    )}

                                {(!collectionTypeOptions[formData.disposition] ||
                                    formData.collection_type) && (
                                        <>
                                            {(formData.collection_type === "Cheque" ||
                                                formData.collection_type === "DD" ||
                                                formData.collection_type === "Online") &&
                                                renderInput("amount", "Amount", amountRef)}

                                            {formData.collection_type === "Online" && (
                                                <TouchableOpacity
                                                    onPress={handleOnlineLinkClick}
                                                    style={styles.onlineButton}
                                                >
                                                    <Text style={styles.onlineButtonText}>Proceed to Payment</Text>
                                                </TouchableOpacity>
                                            )}

                                            {formData.collection_type === "Cheque" && (
                                                <>
                                                    {renderInput("cheque_no", "Cheque No")}
                                                    {renderInput("bank_name", "Bank Name")}
                                                    <DateInput
                                                        placeholder="Cheque Date *"
                                                        value={formData.cheque_date}
                                                        onChange={(val) => updateField("cheque_date", val)}
                                                    />
                                                </>
                                            )}

                                            {formData.collection_type === "DD" &&
                                                renderInput("receipt_no", "Receipt No")}

                                            {formData.collection_type === "Online" &&
                                                renderInput("transcation_id", "Transaction ID")}

                                            {formData.disposition === "Promise to pay" && (
                                                <DateInput
                                                    placeholder="Followup Date *"
                                                    value={formData.followup_date}
                                                    onChange={(val) => updateField("followup_date", val)}
                                                />
                                            )}

                                            {renderInput("remarks", "Remarks")}

                                            <Text style={[styles.sectionTitle, { marginTop: 15 }]}>
                                                Optional Fields
                                            </Text>
                                            {renderInput("alt_mobile_no", "Alternate Mobile No")}
                                            {renderInput("alt_email_id", "Alternate Email ID")}
                                            {renderInput("alt_address", "Alternate Address")}
                                        </>
                                    )}
                            </View>
                        )}

                        {/* Image Picker for Non Contactable */}
                        {formData.visit_status === "Non Contactable" && formData.disposition && (
                            <View style={styles.card}>
                                <Text style={{ color: "#fff", fontWeight: "600" }}>
                                    Click Photo
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: "#007AFF",
                                        padding: 12,
                                        borderRadius: 8,
                                        marginVertical: 10,
                                        alignItems: "center",
                                    }}
                                    onPress={pickImage}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "600" }}>Click Image</Text>
                                </TouchableOpacity>

                                {image && (
                                    <Image
                                        source={{ uri: image }}
                                        style={{ width: 200, height: 200, borderRadius: 12, marginTop: 10 }}
                                        resizeMode="cover"
                                    />
                                )}
                            </View>
                        )}

                        {(formData.disposition === "Fully paid" ||
                            formData.disposition === "Partially paid" ||
                            formData.disposition === "Cheque received"
                        ) && formData.disposition && formData.collection_type && (
                                <View style={styles.card}>
                                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                                        Click Photo
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: "#007AFF",
                                            padding: 12,
                                            borderRadius: 8,
                                            marginVertical: 10,
                                            alignItems: "center",
                                        }}
                                        onPress={pickImage}
                                    >
                                        <Text style={{ color: "#fff", fontWeight: "600" }}>Click Image</Text>
                                    </TouchableOpacity>

                                    {image && (
                                        <Image
                                            source={{ uri: image }}
                                            style={{ width: 200, height: 200, borderRadius: 12, marginTop: 10 }}
                                            resizeMode="cover"
                                        />
                                    )}
                                </View>
                            )}


                        {canShowSubmit && (
                            <TouchableOpacity
                                style={styles.submitBtn}
                                onPress={handleSubmit}
                                disabled={isApiCalling} // button ko disable kare jab loading ho
                            >
                                {isApiCalling ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitText}>Submit</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>

    );
};

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: "#f7f9fb" },
    container: { padding: 18, paddingBottom: 20 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 14,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    sectionTitle: { fontSize: 17, fontWeight: "600", marginBottom: 8, color: "#333" },
    label: { fontSize: 15, fontWeight: "600", color: "#333", marginBottom: 5 },
    star: { color: "red" },
    dropdownBox: { marginBottom: 10 },
    optionWrapper: { marginTop: 6 },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#fafafa",
    },
    optionSelected: { backgroundColor: "#E8F0FE", borderColor: "#007AFF" },
    optionText: { fontSize: 15, color: "#333" },
    optionTextSelected: { color: "#007AFF", fontWeight: "600" },
    submitBtn: { backgroundColor: "#ecba31", padding: 16, borderRadius: 12, marginTop: 10 },
    submitText: { color: "#000", textAlign: "center", fontWeight: "700", fontSize: 16 },
    onlineButton: {
        marginTop: 0,
        marginBottom: 12,
        paddingVertical: 12,
        backgroundColor: "#007AFF",
        borderRadius: 6,
        alignItems: "center",
    },
    onlineButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default DispositionFormScreen;
