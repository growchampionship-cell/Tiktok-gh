import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, StatusBar, TextInput, Alert, Modal, ActivityIndicator } from 'react-native';

export default function App() {
  const [balance, setBalance] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');

  const handleRecharge = (coins, price) => {
    setLoading(true);
    setTimeout(() => {
      setBalance(prev => prev + parseInt(coins.replace(',', '')));
      setLoading(false);
      Alert.alert("Success", `GHS ${price} paid. Coins added!`);
    }, 800);
  };

  const handleSend = () => {
    const amt = parseInt(sendAmount);
    if (!recipient.startsWith('@') || isNaN(amt)) return Alert.alert("Error", "Enter @username and amount");
    if (amt > balance) return Alert.alert("Low Balance", "Recharge more coins.");
    setLoading(true);
    setTimeout(() => {
      setBalance(prev => prev - amt);
      setIsVerified(true);
      setLoading(false);
      setShowSendModal(false);
      Alert.alert("Sent!", `🪙${amt} sent to ${recipient}. You are now Verified! ✅`);
    }, 1200);
  };

  const CoinBox = ({ coins, price }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleRecharge(coins, price)}>
      <View style={styles.coinRow}><Text style={styles.coinIcon}>🪙</Text><Text style={styles.coinAmt}>{coins}</Text></View>
      <Text style={styles.priceText}>GHS {price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navBar}>
        <Text style={styles.navClose}>✕</Text>
        <Text style={styles.navTitle}>TikTok Coins: Buy and recharge Co...</Text>
        <View style={styles.navIcons}><Text style={styles.icon}>🔗</Text><Text style={styles.icon}>⋮</Text></View>
      </View>
      <View style={styles.secureBanner}><Text style={styles.secureText}>🛡️ Secure payment ❯</Text></View>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <Text style={styles.titleText}>TikTok Coins</Text>
               {isVerified && <Text style={{fontSize: 20, marginLeft: 8}}>✅</Text>}
            </View>
            <Text style={styles.subText}>Save around <Text style={{color: '#FE2C55', fontWeight: 'bold'}}>25%</Text> with lower fees.</Text>
          </View>
          <Image source={{uri: 'https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338430_1280.png'}} style={styles.logo} />
        </View>
        <View style={styles.balanceBox}>
           <Text style={styles.balanceLabel}>Account Balance</Text>
           <Text style={styles.balanceValue}>🪙 {balance.toLocaleString()}</Text>
        </View>
        <View style={styles.grid}>
          <CoinBox coins="30" price="4.1" /><CoinBox coins="350" price="47.85" /><CoinBox coins="700" price="95.65" />
          <CoinBox coins="1,400" price="191.25" /><CoinBox coins="3,500" price="478.05" />
          <TouchableOpacity style={styles.card}><Text style={styles.coinAmt}>Custom</Text></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.mainBtn} onPress={() => setShowSendModal(true)}>
          <Text style={styles.mainBtnText}>Send Coins to Friend</Text>
        </TouchableOpacity>
        {loading && <ActivityIndicator size="large" color="#FE2C55" style={{marginTop: 20}} />}
      </ScrollView>

      <Modal visible={showSendModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Send Verified Coins</Text>
            <TextInput style={styles.input} placeholder="@Username" value={recipient} onChangeText={setRecipient} />
            <TextInput style={styles.input} placeholder="Amount" keyboardType="numeric" value={sendAmount} onChangeText={setSendAmount} />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowSendModal(false)}><Text>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={handleSend}><Text style={{color: '#FFF', fontWeight: 'bold'}}>Confirm</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  navBar: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderColor: '#EEE' },
  navTitle: { flex: 1, fontSize: 14, fontWeight: '500', marginLeft: 15 },
  navClose: { fontSize: 20 }, navIcons: { flexDirection: 'row', gap: 15 }, icon: { fontSize: 18 },
  secureBanner: { backgroundColor: '#F0F9F4', padding: 8, alignItems: 'center' },
  secureText: { color: '#27AE60', fontSize: 12, fontWeight: '700' },
  scroll: { padding: 20 }, header: { flexDirection: 'row', marginBottom: 20 },
  titleText: { fontSize: 32, fontWeight: '900' }, subText: { fontSize: 14, color: '#666', marginTop: 5 },
  logo: { width: 55, height: 55 },
  balanceBox: { backgroundColor: '#F8F8F8', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  balanceLabel: { fontSize: 11, color: '#888', textTransform: 'uppercase' },
  balanceValue: { fontSize: 30, fontWeight: 'bold', color: '#FE2C55' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '31%', backgroundColor: '#F8F8F8', borderRadius: 8, paddingVertical: 18, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#F0F0F0' },
  coinRow: { flexDirection: 'row', alignItems: 'center' }, coinIcon: { fontSize: 13, marginRight: 3 }, coinAmt: { fontSize: 16, fontWeight: 'bold' },
  priceText: { fontSize: 11, color: '#888', marginTop: 4 },
  mainBtn: { backgroundColor: '#FE2C55', padding: 16, borderRadius: 4, alignItems: 'center' },
  mainBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 25 },
  modalContent: { backgroundColor: '#FFF', borderRadius: 20, padding: 25, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', backgroundColor: '#F1F1F1', padding: 15, borderRadius: 10, marginBottom: 15 },
  modalButtons: { flexDirection: 'row', gap: 10 },
  cancelBtn: { flex: 1, padding: 15, backgroundColor: '#EEE', borderRadius: 10, alignItems: 'center' },
  confirmBtn: { flex: 1, padding: 15, backgroundColor: '#000', borderRadius: 10, alignItems: 'center' }
});
