# rn-flat-swipe-stack [![npm version](https://badge.fury.io/js/rn-flat-swipe-stack.svg)](https://badge.fury.io/js/rn-flat-swipe-stack)
> react native horizontally swipeable views stack.

## Installation

```sh
npm install rn-flat-swipe-stack
```

## Import and Basic Usage
__Import__
```js
import FlatSwipeStack from 'rn-flat-swipe-stack';
```
__Usage Example:__
```jsx
export default function App() {
  const [swipedIndex, setSwipedIndex] = useState(0);
  useEffect(() => {
    console.log(`current index ${swipedIndex}`);
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
      <FlatSwipeStack
        onSwipe={setSwipedIndex}
        data={data}
        renderItem={renderViewItem}
        stackSpacing={20}
        swipeDuration={500}
        swipeThreshold={60}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height - 140,
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
    width: '100%',
    height: '100%',
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    top: '2%',
    left: '10%',
    width: '90%',
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
```

## Props
* __data: Array__: array of data which will be passed to renderItem.
* __renderItem: Function__: a function which will render each row of data.
* __onSwipe(currentIndex: number) => void__: to be called when swipe index changed.
* __stackSpacing: number__: spacing between rendered items (optional, default = 20),
* __swipeThreshold: number__:  = swipe threshold (optional, default = 60),
* __swipeDuration: number__: = swipe Duration in milliseconds (optional, default = 500),


## Important Note
* Please set __width__ & __height__ of __renderItem__ view, to have the expected behaviour.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

(MIT License)

Copyright © 2021-2030 Jafar Jabr

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
