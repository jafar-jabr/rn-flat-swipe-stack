import { Image, StyleSheet, Text, View } from 'react-native';
// import FlatSwipeStack from 'rn-flat-swipe-stack';
import { doFormat } from 'date-dealer';
import { default as data } from './data.json';
import { useEffect, useState } from 'react';

export default function App() {
  const [swipedIndex, setSwipedIndex] = useState(0);
  useEffect(() => {
    console.log(`current index ${swipedIndex}`);
    console.warn(JSON.stringify(data));
  }, [swipedIndex]);

  const renderViewItem = (item: {
    img_src: string;
    rover: { name: any };
    camera: { full_name: any };
    earth_date: string;
  }): JSX.Element => (
    <View style={styles.item}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={{ uri: item.img_src }} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{item.rover.name}</Text>
        <Text style={styles.subTitle}>{item.camera.full_name}</Text>
        <Text style={styles.subTitle}>
          {doFormat(item.earth_date, 'mmm dd, yyyy')}
        </Text>
      </View>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello</Text>
      {/*<FlatSwipeStack*/}
      {/*  onSwipe={setSwipedIndex}*/}
      {/*  data={data}*/}
      {/*  renderItem={renderViewItem}*/}
      {/*  stackSpacing={20}*/}
      {/*  swipeDuration={500}*/}
      {/*  swipeThreshold={60}*/}
      {/*/>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
    height: '90%',
  },
  imageWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '90%',
    height: '100%',
  },
  image: {
    borderRadius: 10,
    flex: 1,
  },
  body: {
    flexDirection: 'column',
    position: 'absolute',
    top: '2%',
    left: '10%',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 20,
    marginTop: 32,
    marginBottom: 10,
  },
  subTitle: {
    textAlign: 'left',
    color: '#fff',
    fontSize: 14,
  },
});