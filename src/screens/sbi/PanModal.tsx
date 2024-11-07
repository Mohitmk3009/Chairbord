import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import React, { FC, useState } from 'react';
import InputTextSbi from './InputTextSbi';
import UploadDoc from '../../components/common/UploadDoc';
import handleDateChange from '../../utils/handleDobFormat';
import { client } from '../../client/Axios';

interface panModalInterface {
    setPanModalVisible: (visible: boolean) => void,
    panModalVisible: boolean,
    customerId: string | number
}

const PanModal: FC<panModalInterface> = ({ setPanModalVisible, panModalVisible, customerId }) => {
    const [panImage, setPanImage] = useState<any>(null);
    const [pan, setPan] = useState('');
    const [dob, setDob] = useState('');

    const handlePanSubmit = async () => {
        if (!pan || !dob || !panImage) {
            Alert.alert('Please fill all the fields');
        }

        const formData = new FormData();
        formData.append('panNumber', pan);
        formData.append('dob', dob);
        formData.append('pan-image', panImage);
        formData.append('customerId', customerId);

        try {
            const res = await client.post('/sbi/update-customer-pan', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.status === 200) {
                Alert.alert('Pan updated successfully');
            }
        } catch (error: any) {
            console.log('Error while updating pan:', error);
            Alert.alert(error.response.data.message || 'Error while updating pan');
        }
    };

    const allFieldsFilled = pan && dob && panImage;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={panModalVisible}
            onRequestClose={() => setPanModalVisible(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/sbi/chairbordgpslogo.png')} style={styles.logo1} />
                        <Image source={require('../../assets/sbi/cbpllogo.png')} style={styles.logo2} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.modalText}>Please change Customer PAN</Text>
                        <InputTextSbi placeholder="Enter Pan number" value={pan} onChangeText={setPan} />
                        <InputTextSbi
                            placeholder="DD/MM/YYYY"
                            value={dob}
                            onChangeText={(value) => setDob(handleDateChange(value))}
                        />
                        <View style={styles.uploadContainer}>
                            <UploadDoc
                                text="Upload Pan Card"
                                uploadDoc={true}
                                setUploadFile={(file: any) => setPanImage(file)}
                            />
                            {panImage?.uri && (
                                <TouchableOpacity onPress={() => setPanImage(null)}>
                                    <Image
                                        source={{ uri: panImage.uri }}
                                        style={{ height: 120, width: '100%', borderRadius: 20, borderColor: 'black', borderWidth: 1 }}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => setPanModalVisible(false)}
                            style={styles.closeButtonContainer}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handlePanSubmit}
                            disabled={!allFieldsFilled}
                            style={[styles.appButtonContainer, { backgroundColor: allFieldsFilled ? '#5ECD4C' : '#EFE6F7' }]}
                        >
                            <Text style={styles.appButtonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: '#5F259E',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo1: {
        width: 120,
        height: 40,
    },
    logo2: {
        width: 50,
        height: 50,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        marginVertical: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalText: {
        backgroundColor: '#5F259E',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        color: 'white',
        marginBottom: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        display: 'flex',
        gap: 22,
        flexDirection: 'row',
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 10,
        width: '46%',
        alignItems: 'center',
    },
    appButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeButtonContainer: {
        elevation: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '46%',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderRadius: 20,
        height: 140,
        width: 240,
    },
});

export default PanModal;
