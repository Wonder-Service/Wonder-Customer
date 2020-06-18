import React, { Component }  from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableHighlight, AsyncStorage, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { GET, PUT } from "../api/caller";
import { ACCEPT_ORDER_ENDPOINT } from "../api/endpoint";
import NavigationService from '../service/navigation';



export default class HistoryOrderScreen extends Component {
    state = {
        Date: '',
        Credit: '',
        Device: '',
        Rate: '',
        Status: '',
        dataSource:'',
        description:'',
    };

    componentDidMount() {
        return fetch('https://localhost:8080/api/orders', {
            method: 'GET', headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },})
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
            dataSource: responseJson,
        })
    })
    .catch((error) => {
        console.log(error)
    })
    }


    // async componentDidMount() {
    //     await GET(
    //         ACCEPT_ORDER_ENDPOINT,
    //         {},
    //         {},
    //     ).then(resJson => {
    //         this.setState  ({
    //             Date: resJson[1].workDescription.dateCreated,
    //             Credit: resJson[1].totalCredit,
    //             Device: resJson[1].nameDevice,
    //             Rate: resJson[1].rate,
    //             Status: resJson[1].status,
    //             description: resJson[1].workDescription.description,
    //         }
    //         )
    //         console.log(this.state.Date)
    //         console.log(this.state.Credit)
    //         console.log(this.state.Rate)
    //         console.log(this.state.Status)
    //         console.log(this.state.description)
    //     }
        
    //     )
    // }

    render() {
    //     if (this.state.isLoading){
    //       return(
    //         <View style={styles.container}>
    //             <ActivityIndicator/>
    //         </View>
    //       )
    //     }
    //     else{

    //     let list = this.state.dataSource.map((val,key)=>{
    //         return <View key={key} style={styles.item}>
    //             <Text>{val.workDescription.dateCreated}</Text>
    //             <Text>{val.totalCredit}</Text>
    //             <Text>{val.nameDevice}</Text>
    //             <Text>{val.rate}</Text>
    //             <Text>{val.status}</Text>
    //         </View>
    //     })
    // };

        const { Date, Credit, Device, Rate, Status, description } = this.state
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                <Text> History:  {this.state.dataSource}</Text> 
                    {/* <Text> Device:    {Device}</Text> 
                    <Text> Description:  {description}</Text> 
                    <Text> Date:   {Date}</Text>  */}
            </SafeAreaView>
        );
    
        // return (
        //     <View>
        //         <Text>
        //             History: {this.state.dataSource} 
        //     </Text>
        //     </View>
        // )
}
}


const styles = StyleSheet.create({
    container: {
        height:300,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
    }
});

