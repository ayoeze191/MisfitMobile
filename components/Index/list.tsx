import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  // Touchable,
  // TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Filet from './../../assets/filet.svg';
import Banner from './../../assets/Banner.png';

import LinearGradient from 'react-native-linear-gradient';
import {IconButton} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import STORAGE from '../../Storage';
import {RouteProp} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// import {ScrollView} from 'react-native-gesture-handler';

type ItemsRouteProp = RouteProp<
  {params: {category: string; query: string}},
  'params'
>;
const Tab = createMaterialTopTabNavigator();
const List = () => {
  const [categories, setCategories] = useState([{name: 'All'}]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    // allCategories();
  }, []);
  const tabs = [
    'All',
    'furniture',
    'home-decoration',
    'kitchen-accessories',
    'sports-accessories',
  ];
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const getItems = async () => {
    setLoading(true);
    if (category == '') {
      try {
        const res = await axios?.get('https://dummyjson.com/products');
        setItems(res?.data.products);
        setLoading(false);
      } catch (error) {
        console.log(error, 'error');
        setLoading(false);
      }
    } else {
      try {
        const res = await axios?.get(
          'https://dummyjson.com/products/category/' + category,
        );
        setItems(res?.data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  const getCategories = () => {
    // axios.get('https://dummyjson.com/')
  };

  const search = async () => {
    setLoading(true);
    console.log(query);
    const data = (
      await axios.get(`https://dummyjson.com/products/search?q=${query}`)
    ).data.products;
    setItems(data);
    setLoading(false);
  };
  useEffect(() => {
    const getAllProducts = async () => {
      await getItems();
    };
    getAllProducts();
  }, [category]);
  return (
    <View style={style.container}>
      <View style={style.headercontainer}>
        <LinearGradient
          colors={['#111111', '#313131']} // Dark blend
          style={style.linearGradient}
        />
        <View
          style={{
            padding: 16,
          }}>
          <Text style={style.LocationTitle}>Location</Text>
          <View style={style.Locationconta}>
            <Text style={style.Location}>Bilzen, Tanjungbalai</Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="#FFFFFF"
            />
          </View>

          <View style={style.inputContainer}>
            <LinearGradient
              colors={['#2A2A2A', '#313131']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={style.input}>
              <MaterialCommunityIcons name="magnify" size={20} color="#fff" />
              <TextInput
                placeholder="Search Products"
                // placeholderTextColor="#fff"
                value={query}
                onChangeText={text => setQuery(text)}
                style={{color: '#fff', flex: 1}}
              />
            </LinearGradient>
            <TouchableOpacity style={style.filet} onPress={search}>
              <Filet />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={style.banner}>
        <View style={style.bannerImage}>
          <Image source={Banner} style={{width: '100%', borderRadius: 16}} />
        </View>
        <View style={style.BannerDetails}>
          <Text style={style.promo}>Promo</Text>
          <Text style={style.BigText}>Buy One get One free</Text>
        </View>
      </View>
      <Tab.Navigator
        style={style.list_item}
        screenOptions={{
          tabBarStyle: {
            shadowOpacity: 0, // Removes shadow (iOS)
            elevation: 0, // Removes shadow (Android)
            borderBottomWidth: 0, // Ensures no bottom border
            backgroundColor: 'transparent', // Removes default background
          },
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 'auto', // Ensure tabs fit content
            minHeight: 29, // Ensures content is fully visible
            borderRadius: 6, // Rounded corners
            backgroundColor: '#EDEDED', // Set tab background
            marginRight: 16, // Space between tabs
            justifyContent: 'center', // Center content vertically
            alignItems: 'center', // Center content horizontally
          },
          tabBarIndicatorStyle: {
            backgroundColor: 'transparent', // Prevents the indicator from showing
            height: 0, // Hides indicator
          },
          tabBarLabelStyle: {
            fontSize: 14, // Set text size
            fontWeight: 'bold', // Make text bold
            fontFamily: 'Sora-SemiBold', // Use custom font
            textAlign: 'center', // Center text
          },
          tabBarPressColor: 'transparent', // Removes Android ripple effect
          tabBarPressOpacity: 1,
        }}>
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab}
            component={loading ? Loader : () => <Items items={items} />}
            listeners={{
              tabPress: () => {
                setLoading(true);
                setCategory(tab === 'All' ? '' : tab); // Set the category when a tab is selected
              },
            }}
            options={{
              tabBarStyle: {
                backgroundColor: 'transparent',
                elevation: 0, // Removes shadow (Android)
                shadowOpacity: 0, // Removes shadow (iOS)
                borderBottomWidth: 0,
                marginHorizontal: 16,
              },
            }}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
};

export default List;

const Items = ({items}: {items: object[]}) => {
  const [selectedProduct, setSelectedProduct] = useState<{
    title: string;
    images: string[];
    price: number;
    description: string;
  } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log(route.params);
  // const {category} = route.params;
  // const [items, setItems] = useState<
  //   {
  //     id: number;
  //     title: string;
  //     images: string[];
  //     price: number;
  //     description: string;
  //   }[]
  // >([]);
  // const [loading, setLoading] = useState(false);
  // const getItems = async () => {
  //   setLoading(true);
  //   let url;
  //   if (category == '') {
  //     try {
  //       const res = await axios?.get('https://dummyjson.com/products');
  //       console.log(res.data.products, 'products');
  //       setItems(res?.data.products);
  //       setLoading(false);
  //       // console.log(res);
  //     } catch (error) {
  //       console.log(error, 'error');
  //       setLoading(false);
  //     }
  //   } else {
  //     try {
  //       const res = await axios?.get(
  //         'https://dummyjson.com/products/category/' + category,
  //       );
  //       setItems(res?.data.products);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const getAllProducts = async () => {
  //     await getItems();
  //   };
  //   getAllProducts();
  // }, []);

  return (
    <>
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}>
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Image
                source={{uri: selectedProduct.images[0]}}
                style={style.modalImage}
              />
              <Text style={style.modalTitle}>{selectedProduct.title}</Text>
              <Text style={style.modalPrice}>${selectedProduct.price}</Text>
              <Text style={style.modalDescription}>
                {selectedProduct.description}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={style.closeButton}>
                <Text style={style.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <FlatList
        data={items}
        keyExtractor={(item: {
          id: number;
          title: string;
          images: string[];
          price: number;
        }) => item.id.toString()}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        contentContainerStyle={style.items} // instead of a ScrollView’s container
        renderItem={({item}) => (
          <Item
            item={item}
            key={item.id}
            name={item.title}
            img={item.images[0]}
            stock_price={item.price}
            onPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}
          />
        )}
      />
    </>
  );
};

type ItemProps = {
  img: string;
  name: string;
  stock_price: number;
  onPress: () => void;
  item: object;
};

const Item: React.FC<ItemProps> = ({img, name, stock_price, onPress, item}) => {
  const AddToCart = async () => {
    console.log(STORAGE.NON_SECURE.getObject('Misfit_cart'));

    console.log('adding to cart');
    let Availableprods = await STORAGE.NON_SECURE.getObject('Misfit_cart');
    try {
      if (
        Object.keys(Availableprods).length == 0 ||
        Availableprods.length == 0
      ) {
        await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
          {...item, quantity: 1},
        ]);
      } else {
        const prodAvailable = Availableprods.find(prod => prod.id == item.id);
        console.log(prodAvailable, 'prodAvailable');
        if (prodAvailable) {
          const computedProduct = Availableprods.map(prod =>
            prod.id == item.id
              ? {...prod, quantity: prod.quantity + 1}
              : {...prod},
          );
          await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
            ...computedProduct,
          ]);
        } else {
          await STORAGE.NON_SECURE.storeObject('Misfit_cart', [
            ...Availableprods,
            {...item, quantity: 1},
          ]);
        }
      }
      Toast.show({
        type: 'success',
        text1: 'Successfully added to cart',
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TouchableOpacity onPress={onPress} style={style.item}>
      <View style={{width: '100%'}}>
        <Image style={style.image} source={{uri: img}} resizeMode="cover" />
      </View>
      <View style={style.item_details}>
        <View style={{maxWidth: 70, marginRight: 2}}>
          <Text style={{}}>
            {name.length > 12 ? name.slice(0, 12) + '...' : name}
          </Text>
          <Text>{stock_price}</Text>
        </View>
        <TouchableOpacity onPress={() => AddToCart()}>
          <View
            style={{
              backgroundColor: '#C67C4E',
              color: '#fff',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 5,
            }}>
            {/* + */}
            <MaterialCommunityIcons name="cart" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Loader = () => {
  return (
    <View style={style.loader}>
      <ActivityIndicator size="large" color="#C67C4E" />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  headercontainer: {
    height: 200,
    position: 'relative',
    width: '100%',
    backgroundColor: 'red',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
    position: 'absolute',
  },
  LocationTitle: {
    color: '#A2A2A2',
    fontFamily: 'Sora-Regular',
  },
  Locationconta: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 4,
  },
  Location: {
    color: '#ffffff',
    fontFamily: 'Sora-Regular',
  },
  Search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(49, 49, 49, 1)',
    flex: 1,
    position: 'relative',
    borderRadius: 12,
    height: 52,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 24,
    height: 52,
    width: '100%',
    position: 'relative',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 16,
    marginTop: 24,
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    fontSize: 14,
    alignItems: 'center',
    // position: 'relative',
    // height: '100%',
  },
  filet: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#C67C4E',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    marginTop: -50,
    width: '100%',
    paddingHorizontal: 16,
    height: 140,
    display: 'flex',
    position: 'relative',
    borderRadius: 16,
    // backgroundColor: 'red',
  },
  BannerDetails: {
    position: 'absolute',
    paddingHorizontal: 50,
    paddingVertical: 13,
  },
  bannerImage: {
    borderRadius: 16,
    width: '100%',
    left: 2,
  },
  promo: {
    backgroundColor: '#ED5151',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8,
    width: 60,
    height: 26,
    textAlign: 'center',
  },
  BigText: {
    fontSize: 32,
    fontWeight: 'semibold',
    color: '#fff',
    fontFamily: 'Sora-SemiBold',
  },
  list_item: {
    width: '100%',
    padding: 16,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // optional, for even spacing
    padding: 16,
    paddingTop: 24,
    gap: 1,
  },
  item: {
    width: '48%',
    marginBottom: 15, // vertical spacing between rows
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  item_details: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 18,
    color: '#C67C4E',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#C67C4E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
