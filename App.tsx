import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {Calendar} from 'react-native-calendars';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DATA = [
  {id: '1', name: 'SAMSUNG'},
  {id: '2', name: 'OPPO'},
  {id: '4', name: 'VIVO'},
  {id: '5', name: 'APPLE'},
  {id: '6', name: 'REDMI'},
  {id: '7', name: 'NOKIA'},
  {id: '8', name: 'LENOVO'},
  {id: '9', name: 'MOTOROLA'},
];

function HomeScreen({navigation}: any) {
  const [search, setSearch] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(
  new Date().toISOString().split('T')[0] 
  );
  const filtered = DATA.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    
    <View style={{flex: 1}}>

      <View style={styles.header}>

  {/* HEADER TOP */}
  <View style={styles.headerRow}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <Text style={{color: 'white', fontSize: 24}}>☰</Text>
    </TouchableOpacity>

    <Text style={styles.title}>⏱️Time Sheet</Text>
    

    <Text style={{color: 'white', fontSize: 28}}>🧑</Text>
  </View>

  {/* HEADER TABS */}
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.tabsContainer}
  >
    <Text style={styles.tab}>Profile</Text>
    <Text style={styles.tab}>Projet Deadline</Text>
    <Text style={styles.tab}>Submitted Activity</Text>
    <Text style={styles.tab}>Raised Request</Text>
    <Text style={styles.tab}>Leave History</Text>
    <Text style={styles.tab}>Approvals</Text>
    
  </ScrollView>

</View>

      {/* MAIN CONTENT */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 120}}
        ListHeaderComponent={
          <View>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.pending}>
                📋 Pending Activity {selectedDate ? `(${selectedDate})` : ''}
              </Text>

              <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
                <Text style={{fontSize: 24}}>📅</Text>
              </TouchableOpacity>
            </View>
            {showCalendar && (
              <Calendar
                style={{marginTop: 10, borderRadius: 10,overflow: 'hidden'}}
                enableSwipeMonths={true}
                hideArrows={false}
                current={currentMonth}
                onDayPress={(day) => {
                  setSelectedDate(day.dateString);
                  
                }}
                onMonthChange={(month) => {
                  setCurrentMonth(month.dateString); 
                }}
                markedDates={{
                  [selectedDate]: {
                    selected: true,
                    selectedColor: 'red',
                  },
                }}
                theme={{
                  selectedDayBackgroundColor: 'red',
                  todayTextColor: 'red',
                  arrowColor: 'red',
                }}
              />
            )}
            
            </View>
            <View style={styles.searchContainer}>
            <TextInput
              placeholder="🔍 Search Product Name"
              style={styles.search}
              value={search}
              onChangeText={setSearch}
            />
            </View>
          </View>
        }
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
          </View>
        )}
      />

        
      

      {/* FLOAT BUTTON */}
      <TouchableOpacity style={styles.fab}>
        <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>+</Text>
      </TouchableOpacity>

    </View>
    
  );
}

function BottomTabs() {
  return (
    
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: { display: 'none' },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
              🏠{'\n'}Home
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{ textAlign: 'center', fontSize: 14, fontWeight: '600' }}>
              🧑{'\n'}Profile
            </Text>
          ),
          tabBarIcon: () => null,
        }}
      />
    </Tab.Navigator>
    
  );
}
  

export default function App() {
  return (
    <SafeAreaProvider>
    
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="Dashboard" component={BottomTabs} />
        <Drawer.Screen name="Schedule" component={BottomTabs} />
        <Drawer.Screen name="Settings" component={BottomTabs} />
        <Drawer.Screen name="Sign out" component={BottomTabs} />
        
      </Drawer.Navigator>
    </NavigationContainer>
    
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  header: {
    backgroundColor: 'red',
    paddingTop: 15,
    
  },
  headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 15,
  paddingBottom: 10,
},

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  tabs: {
    backgroundColor: 'red',
    padding: 10,
  },

  tab: {
    color: 'white',
    marginRight: 20,
    fontWeight: '600',
  },

  container: {
    flex: 1,
    backgroundColor: '#eee',
  },

  card: {
    backgroundColor: 'white',
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  pending: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  search: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },

  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
  paddingHorizontal: 10,
  paddingBottom: 10,
  
},

tabButton: {
  marginRight: 15,
  backgroundColor: '#b30000',
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 20,
},
searchContainer: {
  marginHorizontal: 15,
},

});