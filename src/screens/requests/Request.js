import { View, Text, StyleSheet, ScrollView, Pressable, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import RequestCard from './RequestCard'
import SelectField from '../../components/common/SelectField'
import RequestModal from './RequestModal'
import RequestFilter from './RequestFilter'

const requestCardData = [
    {
        requestType: "Return request",
        requestStatus: "Pending",
        requestDate: "16-03-2024",
        requestTime: "20:19:36",
        transactionId: "TRR:8844851",
        orderNumber: "Order no.  TOR:8794646"
    },
    {
        requestType: "Service request",
        requestStatus: "Pending",
        requestDate: "16-03-2024",
        requestTime: "20:19:36",
        transactionId: "TRR:8844851",
        orderNumber: "Order no.  TOR:8794646"
    },
    {
        requestType: "Return request",
        requestStatus: "Pending",
        requestDate: "16-03-2024",
        requestTime: "20:19:36",
        transactionId: "TRR:8844851",
        orderNumber: "Order no.  TOR:8794646"
    },
    {
        requestType: "Support request",
        requestStatus: "Pending",
        requestDate: "16-03-2024",
        requestTime: "20:19:36",
        transactionId: "TRR:8844851",
        orderNumber: "Order no.  TOR:8794646"
    },
    {
        requestType: "Return request",
        requestStatus: "Pending",
        requestDate: "16-03-2024",
        requestTime: "20:19:36",
        transactionId: "TRR:8844851",
        orderNumber: "Order no.  TOR:8794646"
    },

]

const tagSerialNumber = [
    { title: '008' },
    { title: '0098' },
    { title: '568' },
    { title: '8989' }
]

const Request = () => {
    const [searchText, setSearchText] = useState('')
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [dataShowModal, setDataShowModal] = useState(false);
    return (
        <ScrollView style={styles.container}>
            <View style={{ padding: "5%" }}>
                <View style={styles.searchAndfilter}>
                    <View style={styles.searchField}>
                        <Image
                            source={require('../../assets/screens/wallet/searchLogo.png')}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Search"
                            placeholderTextColor={'#9A9A9A'}
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>
                    <Pressable
                        onPress={() => setShowFilterModal(true)}
                        style={styles.filterLogo}
                    >
                        <Image source={require('../../assets/screens/wallet/filter.png')} />
                    </Pressable>
                </View>
                <View style={styles.divider}></View>

                <View >
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ maxWidth: "70%", marginEnd: "5%" }}>
                            <SelectField dataToRender={tagSerialNumber} title={"Select request type"} />
                        </View>
                        <View style={styles.excelButton}>
                            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: 19, color: "#FFFFFF" }}>Excel</Text>
                            <Image source={require("../../assets/requestScreen/downloadIcon.png")} style={{ marginLeft: "3%" }} />
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: "4%" }}>
                    {requestCardData.map((data, index) => (
                        <Pressable onPress={() => setDataShowModal(true)}>
                            <RequestCard
                                key={index}
                                data={data}
                            />
                        </Pressable>
                    ))}
                </View>
            </View>


            {/* filter modal */}
            <RequestFilter
                visible={showFilterModal}
                onClose={() => setShowFilterModal(false)}
            />

            {/* Details Modal */}
            <RequestModal
                visible={dataShowModal}
                onClose={() => setDataShowModal(false)}
            />


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchAndfilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        gap: 20,
        marginTop: '5%'
    },
    searchField: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 22,
        borderWidth: 1,
        borderColor: '#858585',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000000'
    },
    filterLogo: {
        borderWidth: 1,
        borderColor: '#858585',
        borderRadius: 50,
        padding: 15
    },
    divider: {
        height: 0.7,
        backgroundColor: '#4C6470',
        marginVertical: "5%"
    },
    excelButton: {
        flexDirection: 'row',
        marginRight: "5%",
        alignItems: 'center',
        backgroundColor: "#263238",
        color: "white",
        paddingVertical: "3%",
        paddingHorizontal: "5%",
        borderRadius: 12,
    }
});


export default Request