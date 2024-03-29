import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import { getBusinessOrders, updateOrderStatus } from "../../utils/feedapi"
import Loading from '../Screens/Loading';
import { getUserEmail } from '../../utils/rememberUserType';
import { getShopData } from '../../utils/api';
import Swipe from './Swipe';
import { Entypo } from '@expo/vector-icons';

type singleOrder = {
    status: string;
    order_id: number;
};

interface HideObject {
    [key: string]: boolean;
}


export default function BusinessOrders() {
    const [businessOrders, setBusinessOrders] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hide, setHide] = useState<HideObject>({});
    const [shop, setShop] = useState({ id: "", name: "" })
    const scrollRef = useRef<ScrollView>();
    const [coordinates, setCoordinates] = useState([])
    const [index, setIndex] = useState(0)
    const arrowUpProps = {
        activeOpacity: 0.1,
        underlayColor: '#f5ece4',
        onPress: () => onArrowUpPressed()
    };
    const arrowDownProps = {
        activeOpacity: 0.1,
        underlayColor: '#f5ece4',
        onPress: () => onArrowDownPressed()
    };
    const onArrowUpPressed = () => {
        if (index === 0) {
            return
        }
        scrollRef.current?.scrollTo({
            y: coordinates[index - 1] + 90,
            animated: true

        })
        setIndex(index - 1)

    }
    const onArrowDownPressed = () => {
        scrollRef.current?.scrollTo({
            y: coordinates[index + 1] + 90,
            animated: true
        });
        if (index === coordinates.length) {
            return
        }
        setIndex(index + 1)
    }

    function handleUpdateStatus(order_id: number) {
        setHide((current) => ({ ...current, [order_id]: true }))
        updateOrderStatus(order_id).then(() => {
        })
    }
    useEffect(() => {
        getUserEmail().then(({ email }: any) => {
            if (!email) { return }
            getShopData(email).then(({ _id, name }) => {
                setShop((previousShop) => ({ ...previousShop, id: _id, name: name }))
                getBusinessOrders(_id).then(({ orders }) => {
                    setBusinessOrders(orders);

                    setIsLoading(false)
                });
            })
        })
        const interval = setInterval(() => {

            setShop(previousShop => {
                getBusinessOrders(previousShop.id).then(({ orders }) => {
                    setBusinessOrders(orders);
                });
                return previousShop;
            });
        }, 15000);

        return () => clearInterval(interval);

    }, [shop.id]);

    return (<>
        <ScrollView ref={scrollRef} contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>

            <View style={{ flexDirection: "row", backgroundColor: "#f5ece4", paddingBottom: 15, paddingTop: 30 }}>

                <View style={{ flexDirection: "row" }}>
                    <View style={{ marginLeft: 10, justifyContent: "center" }}>
                        <TouchableHighlight {...arrowUpProps}><Entypo name="arrow-bold-up" size={40} color="black" /></TouchableHighlight>
                        <TouchableHighlight {...arrowDownProps}><Entypo name="arrow-bold-down" size={40} color="black" /></TouchableHighlight>
                    </View>
                    <Text style={styles.h1}>Pending Orders</Text>

                </View>

            </View>

            {isLoading ? <Loading /> : businessOrders.some((order) => order.orders.some((singleorder: any) => singleorder.status === "open")) ? businessOrders.map((order) => {

                return order.orders.slice(-40).map((singleorder: singleOrder) => {
                    if (singleorder.status === "closed") { return }
                    return (hide[singleorder.order_id] === true ? null : <View onLayout={(event) => {
                        const { y } = event.nativeEvent.layout
                        const id = singleorder.order_id
                        setCoordinates([...coordinates, y])


                    }} style={{ minHeight: 220, maxHeight: 220 }}>
                        <Swipe key={singleorder.order_id} order={singleorder} handleUpdateStatus={handleUpdateStatus}></Swipe></View>

                    );
                })
            }) : <Text style={styles.h1}>You have no pending orders</Text>}
        </ScrollView>
    </>
    );
}
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

    container: {
        display: "flex",
        flexDirection: "column",
        paddingBottom: 100,
        marginTop: 0,
        backgroundColor: "#f5ece4",

    },
    text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
    },
    h1: {

        alignSelf: "center",
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 40



    },

    image: {
        width: width * 0.25,
        height: width * 0.25,
        resizeMode: 'cover',
    },

    description: {
        fontSize: width * 0.035,
        color: '#666',
        marginVertical: width * 0.005,
        marginLeft: width * 0.05,

        flex: 1,
        flexWrap: 'wrap',

    },
    date: {
        fontSize: width * 0.03,
        color: '#999',
    },
});