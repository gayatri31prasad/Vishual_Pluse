// Dashboard.tsx
import React, { useEffect } from 'react';
import {
  View, Text, StyleSheet, Image, ScrollView, Dimensions,
  ActivityIndicator,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardData } from '../slices/dataSlice';
import { AppDispatch, RootState } from '../store/store';
import moment from 'moment';
import CustomProgressCircle from '../components/ProgressCircle';

const screenWidth = Dimensions.get('window').width;

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cardData, loading, error } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchCardData());
  }, [dispatch]);
  
  return (
    loading ? 
      <ActivityIndicator style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}} size="large" color="#007AFF" />
    : error ? <Text style={styles.error}>{error ?? 'Error fetching data.'}</Text>
    : <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi, Clarence</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' ,gap:5,marginTop:2}}>
            <MaterialIcons name="wifi-calling-3" size={20} color="#666" />
            <Text style={styles.subtext}>(801) 923-2930</Text>
          </View>
        </View>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
      </View>

      {/* Tips & Task Completed */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={[styles.infoCard, { backgroundColor: '#4562f3' }]}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <FontAwesome name="bell" size={18} color="#fff" style={{borderRadious:20,backGroundColor:'#fff'}}/>
                <Text style={[styles.infoTitle,{color:'#fff',width:'90%',fontWeight:'600'}]}>Tips on increasing your go forward</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5,}}>
                <Text style={[{color:'#fff',width:'90%',fontSize:12}]}>Lorem ipsum dolor sitamet, consectetur</Text>
                <FontAwesome name="bell" size={12} color="#fff" style={{borderRadious:20,backGroundColor:'#fff'}}/>
            </View>
        </View>
        <View style={[styles.infoCard, { backgroundColor: '#44d6a8' }]}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <Icon name="checkmark-circle" size={24} color="#1ABC9C" />
                <Text style={[styles.infoTitle,{color:'#fff',width:'90%',fontWeight:'600'}]}>Weekly task has been completed</Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:5,}}>
                <Text style={[{color:'#fff',width:'90%',fontSize:12}]}>Lorem ipsum dolor sitamet, consectetu</Text>
                <Icon name="checkmark-circle" size={14} color="#1ABC9C" />            
            </View>
        </View>
      </ScrollView>

      {/* Wallet Info */}
      <View style={styles.walletContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',borderBottomWidth:2,borderColor:'#a8adb7',paddingBottom:5}}>
          <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <View style={{ height: 45, width: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#b9aeff', borderRadius: 100}}>
              <MaterialCommunityIcons name="wallet" size={30} color="#634ae2" />
            </View>
            <View style={{}}>
              <Text style={styles.walletAmount}>${cardData?.balance}</Text>
              <Text style={styles.walletLabel}>Wallet Balance</Text>
            </View>
          </View>
          <Feather name="arrow-right-circle" size={34} color="#a8adb7" />
        </View>
        <View style={styles.walletDetails}>
          <View>
            <Text style={{...styles.walletAmount,fontSize:19}}>{moment(cardData?.auto_fill_date).format('Do MMM, YYYY')} </Text>
            <Text>Auto fill date</Text>
          </View>
          <View style={{height:'100%',width:3,backgroundColor:'#a8adb7'}} />
          <View>
            <Text style={{...styles.walletAmount,fontSize:19}}>${cardData?.auto_fill_amount}</Text>
            <Text>Auto fill amount</Text>
          </View>
        </View>
      </View>

      {/* Activity Stats */}
      <View style={styles.row}>
        <View style={styles.activityCard}>
          <Text style={styles.activityLabel}>Activities this week</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={styles.activityNumber}>136</Text>
            <Feather name="trending-down" size={16} color="red" />
            <Text style={styles.activitySubLabel}>-7.6%</Text>
          </View>
          <Text>Avg. 26 calls per day </Text>
        </View>
        <View style={styles.activityCard}>
          <Text style={styles.activityLabel}>Activities this month</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={[styles.activityNumber, { color: '#27AE60' }]}>986</Text>
            <Feather name="trending-up" size={16} color="#27AE60" />
            <Text style={[styles.activitySubLabel, { color: '#27AE60' }]}>+10.6%</Text>
          </View>
          <Text>Avg. 146 calls per week</Text>
        </View>
      </View>

      {/* Task Completion */}
      <View style={styles.progressCard}>
        <View style={{ marginRight: 12,alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18,position: 'absolute',color: '#fff',zIndex: 1 }}>76%</Text>
            <CustomProgressCircle 
              progress={0.76}
              size={70}
            />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 22,color: '#fff',fontWeight: 'bold' }}>Overal Task Completion</Text>
          <Text style={{ fontSize: 13,color: '#fff',flex:1 }}>Achivement agains total calls targeted for the mont of September</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <Text style={[styles.tabText, styles.activeTab]}>Recent</Text>
        <Text style={styles.tabText}>All Groups</Text>
        <Text style={styles.tabText}>Archived</Text>
        <AntDesign size={26} name="swap" color="#8c96a6" style={{ position: 'absolute', right: 0,fontWight: '900' }} />
      </View>

      {/* Campaign Cards */}
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={{...styles.walletAmount,fontSize:16}}>Lead Generation Campaign</Text>
          <Text>Lorem ipsum dolor sitamet, consectetur..</Text>
          <View style={{width:'100%',height:7,backgroundColor:'#f1f4fc',borderRadius:10,marginVertical:7}}>
            <View style={{width:'40%',height:'100%',backgroundColor:'#5938a9',borderRadius:10}}/>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5,justifyContent: 'space-between' }}>
            <View>
              <Text style={{...styles.walletAmount,fontSize:14}}>343</Text>
              <Text style={styles.cardSub}>Completed</Text>
            </View>
            <View>
              <Text style={{...styles.walletAmount,fontSize:14}}>368</Text>
              <Text style={styles.cardSub}>Pending</Text>
            </View>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={{...styles.walletAmount,fontSize:16}}>Product Launch Marketing</Text>
          <Text>Lorem ipsum dolor sitamet, consectetur..</Text>
          <View style={{width:'100%',height:7,backgroundColor:'#f1f4fc',borderRadius:10,marginVertical:7}}>
            <View style={{width:'70%',height:'100%',backgroundColor:'#5938a9',borderRadius:10}}/>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5,justifyContent: 'space-between' }}>
            <View>
              <Text style={{...styles.walletAmount,fontSize:14}}>488</Text>
              <Text style={styles.cardSub}>Completed</Text>
            </View>
            <View>
              <Text style={{...styles.walletAmount,fontSize:14}}>105</Text>
              <Text style={styles.cardSub}>Pending</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View style={{marginVertical:10,backgroundColor:'#fff',borderRadius:10,padding:10}}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10,justifyContent: 'space-between'}}>
          <View>
            <Text style={{...styles.walletAmount,fontSize:16}}>September Activities</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10,marginVertical:10,marginLeft:10}}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                <View  style={{height:10,width:10,backgroundColor:'#8838d0',borderRadius:10}}/>
                <Text style={styles.cardSub}>Current Month</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5,}}>
                <View  style={{height:10,width:10,backgroundColor:'#33b9cb',borderRadius:10}}/>
                <Text style={styles.cardSub}>Previous Month</Text>
              </View>
            </View>
          </View>
          <Feather name="arrow-right-circle" size={34} color="#a8adb7" />
        </View>
        <LineChart
          data={{
            labels: ['1st', '7th', '14th', '21st', '28th'],
            datasets: [
              {
                data: [30, 45, 28, 80, 70],
                color: () => '#86ebf0',
              },
              {
                data: [20, 40, 35, 60, 50],
                color: () => '#9B59B6',
              },
            ],
          }}
          width={screenWidth - 22}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: () => '#333',
            labelColor: () => '#333',
          }}
          bezier
          style={{ marginVertical: 8 ,marginLeft:-10}}
        />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#edf3fc',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    margin: 'auto'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2b3689',
  },
  subtext: {
    color: '#666',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 24,
    borderWidth:2,
    borderColor: '#514a8a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    gap: 10
  },
  infoCard: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical:6,
    borderRadius: 6,
    marginRight: 8,
    marginTop: 10,
    width: 220,
  },
  infoTitle: {
    fontSize: 14,
    color: '#333',
  },
  walletContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  walletAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#434995',
  },
  walletLabel: {
    fontSize: 14,
    color: '#555',
  },
  walletDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 12,
  },
  activityCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activityNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  activityLabel: {
    fontSize: 16,
    color: '#434995',
    fontWeight: 'bold',

  },
  activitySubLabel: {
    fontSize: 12,
    color: 'red',
  },
  progressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4562f2',
    borderRadius: 12,
    padding: 10,
    paddingHorizontal: 16,
    marginTop: 10,
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    padding: 6,
    borderRadius: 20,
    color: '#888',
    width: 100,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeTab: {
    color: '#fff',
    backgroundColor: '#576cfa',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardSub: {
    fontSize: 12,
    color: '#555',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
});
