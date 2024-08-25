

import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { getLatestGames} from '../lib/metacritic'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedGameCard } from './GameCard';
import { Logo } from './Logo'

export function Main() {
  const [games, setGames] = useState([])
  const insets = useSafeAreaInsets()

  useEffect(()=> {
    getLatestGames().then((games)=> {
      setGames(games)
    })
  },[])

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>     
    <View style={{ marginBottom: 20 }}>
      <Logo />
    </View>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ): (
        <FlatList
          data={games}
          keyExtractor={game => games.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />   
      )}                
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 42
  },
  image: {
    width: 107,
    height: 147,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",    
    color: "#fff",
    marginTop: 10
  },
  description: {
    fontSize: 16,
    color: '#eee'
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'green',
    marginBottom: 10
  }
});

