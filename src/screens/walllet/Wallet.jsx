import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import WalletCards from './WalletCards'
import walletCardData from './WalletCardData'
import FilterTags from './FilterTags'

const Wallet = () => {
  const [searchText, setSearchText] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [showFilterModal, setShowFilterModal] = useState(false)

  const tagsData = ['All', 'Send', 'Received', 'Top Up', 'Withdraw']
  return (
    <ScrollView style={styles.container}>
      <View style={{ padding: '5%' }}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceText}>Balance</Text>
          <Text style={styles.amountText}>₹1,055</Text>

          <View style={{ flexDirection: 'row', gap: 30, marginTop: '2%' }}>
            <View>
              <Image
                source={require('../../assets/screens/wallet/topUp.png')}
              />
              <Text style={styles.tagText}>Top up</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={require('../../assets/screens/wallet/withdraw.png')}
              />
              <Text style={styles.tagText}>Withdraw</Text>
            </View>
            <View>
              <Image source={require('../../assets/screens/wallet/more.png')} />
              <Text style={styles.tagText}>More</Text>
            </View>
          </View>
        </View>

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
      </View>

      <View style={styles.transactionContainer}>
        <Text style={styles.transactionText}>Transaction</Text>

        <ScrollView horizontal={true}>
          {tagsData.map((data, index) => (
            <Pressable
              style={[
                styles.tags,
                activeTag === data ? styles.activeTag : null
              ]}
              key={index}
              onPress={() => setActiveTag(data)}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: activeTag === data ? 'white' : '#263238',
                  textAlignVertical: 'center'
                }}
              >
                {data}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View>
          {walletCardData.map((data, index) => (
            <WalletCards
              key={index}
              logo={data.logo}
              title={data.title}
              description={data.description}
              amountValue={data.amount}
              ID={data.ID}
              RefNo={data.RefNo}
              date={data.date}
              time={data.time}
            />
          ))}
        </View>
      </View>

      {/* Filter modal */}
      <FilterTags
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  balanceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#00000040',
    width: '100%',
    height: 178,
    backgroundColor: '#FFFFFF',
    borderRadius: 25
  },
  balanceText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#9A9A9A'
  },
  amountText: {
    fontWeight: '600',
    fontSize: 40,
    lineHeight: 48,
    textAlign: 'center',
    marginBottom: '2%',
    color: '#000000'
  },
  tagText: {
    color: '#808080',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    marginTop: '10%'
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
    backgroundColor: 'white',
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
  transactionContainer: {
    elevation: 2,
    shadowColor: '#00000040',
    backgroundColor: '#FFFFFF',
    width: '100%',
    paddingHorizontal: '5%',
    paddingBottom: '10%'
  },
  transactionText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
    paddingVertical: '5%'
  },
  tags: {
    height: 40,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#263238',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  activeTag: {
    backgroundColor: '#263238'
  }
})

export default Wallet
