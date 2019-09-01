import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import SearchBar from 'react-native-search-bar';

const items = ['Apples', 'Pie', 'Juice', 'Cake', 'Nuggets'];

const App = () => {
  const [search, setSearch] = useState('');
  const search1 = React.createRef();
  const search2 = React.createRef();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inset}>
        <Text style={styles.header}>Dark Style</Text>
        <SearchBar
          ref={search1}
          barStyle="black"
          onSearchButtonPress={() => search1.current.blur()}
        />

        <Text style={styles.header}>Search Example</Text>
        <SearchBar
          text={search}
          ref={search2}
          onChange={e => console.log(e.nativeEvent)}
          onChangeText={setSearch}
          onSearchButtonPress={() => search2.current.blur()}
        />

        {items
          .filter(a => a.toLowerCase().indexOf(search.toLowerCase()) !== -1)
          .map(a => (
            <Text style={styles.listItem} key={a}>
              {a}
            </Text>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  inset: {
    flex: 1,
  },
  header: {
    textAlign: 'center',
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
});

export default App;
