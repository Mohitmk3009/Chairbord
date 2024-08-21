import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const CreateButton = ({ title, onpressOperation }) => {
  return (
    <>
      <Pressable
        // style={styles.excelButton}
        onPress={onpressOperation}
      >
        <LinearGradient
          colors={['#02546D', '#142D40']}
          style={styles.excelButton}
        >
          <Text style={styles.excelButtonText}>{title}</Text>
          <Image
            source={require('../../assets/addIcon.png')}
          />
        </LinearGradient>
      </Pressable>
    </>
  )
}

const styles = StyleSheet.create({
  excelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  width:120,
  height:40,
    color: 'white',
    borderRadius: 50,
    paddingHorizontal: '5%'
  },
  excelButtonText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    color: '#FFFFFF',
    // marginHorizontal:50,
    paddingVertical: '5%',
    justifyContent:'center',
    alignItems:'center'
  }
})

export default CreateButton