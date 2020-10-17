import { Button, Card, CardItem, Container, Content, Header, Input, Spinner } from 'native-base';
import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import ColorSQL from '../../thema/colorSQL';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux';
import {getContact, postContact, putContact, deleteContact} from '../../action'
import { NavigationEvents } from 'react-navigation';
const FULLWIDTH = Dimensions.get('window').width
class KontakKita extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            getContact:{},
            postContact:{},
            putContact:{},
            deleteContact:{},
            dataDiri: props.navigation.getParam('diri'),
            cari:'',
            load: true,
            dataKontak:[],
            dataSearch:[]
        }

        this.initState = this.initState.bind(this)

        console.log(JSON.stringify(this.state.dataDiri))
    }
    componentDidMount(){
        this.initState()
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataKontak !== newProps.dataKontak){
            if(newProps.dataKontak.get){
                this.setState({
                    getContact: newProps.dataKontak.get,
                    load:false,
                    dataKontak:newProps.dataKontak.get.data,
                    dataSearch:newProps.dataKontak.get.data
                })
            }
            if(newProps.dataKontak.delete){
                console.log(JSON.stringify(newProps.dataKontak.delete))
                this.setState({
                    deleteContact: newProps.dataKontak.delete
                })
            }
            if(newProps.dataKontak.message){
                alert(JSON.stringify(newProps.dataKontak.message))
            }
        }
    }
    initState(){
        this.props.getContact()
    }
    cari(txt){
        if(this.state.getContact !== {}){
            if(txt.length >0){
                console.log(txt)
                
                var data = this.state.dataSearch.filter(t =>{
                    var nama=t.firstName+" "+t.lastName
                    return  nama.toLowerCase().match(txt.toLowerCase())
                })
                this.setState({
                    dataKontak: data
                })
            }else{
                this.setState({
                    dataKontak: this.state.dataSearch
                })
            }

        }
    }
    render() { 
        return (  
            <Container>
                <NavigationEvents onDidFocus={() => this.initState()}/>
                <View style={{backgroundColor:ColorSQL.primary, flexDirection:'row', padding:20, alignItems:'center'}}>
                    <Image source={require('../../image/eres.jpg')} style={{width:80, resizeMode:'cover', height:80, borderRadius:40}}/>
                    <View style={{marginLeft:10, alignItems:'flex-start', flex:1}}>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <FaIcon name="user" size={14}/>
                            <Text style={{marginLeft:10}}>{this.state.dataDiri.user_name}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <FaIcon name="phone" size={14}/>
                            <Text style={{marginLeft:10}}>{this.state.dataDiri.user_contact}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <FaIcon name="envelope" size={14}/>
                            <Text style={{marginLeft:10}}>{this.state.dataDiri.user_address}</Text>
                        </View>
                    </View>
                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('welcome')}
                        style={{paddingRight:20}}>
                        <FaIcon name="sign-out-alt" size={24} color={ColorSQL.info}/>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', backgroundColor:'#f2f2f2', alignItems:'center'}}>
                    <Text style={{color:ColorSQL.info, textAlign:'center', marginRight:10, alignItems:'center', fontSize:14, fontWeight:'bold', backgroundColor:ColorSQL.secondary, padding:10}}>Kontak Kita</Text>
                    <FaIcon name="search" size={20}/>
                    <Input style={{fontSize:14}} onChangeText={text => this.cari(text)} placeholder="Cari kontak kita"/>
                </View>
                {this.state.load ?
                <Content>
                    <Spinner color={ColorSQL.primary}/>
                </Content>:
                <FlatList 
                ListFooterComponent={() =>{
                    return(
                        <View style={{marginBottom:100}}/>
                    )
                }}
                style={{marginLeft:5}}
                numColumns={2}
                data ={this.state.dataKontak}
                keyExtractor={item => item.id}
                renderItem={({item, index}) =>{
                    return(
                        <Card style={{width: FULLWIDTH/2-10}}>
                            <View style={{alignItems:'center', margin:10}}>
                            <Text style={{fontSize:10}}>Nama</Text>
                                <Text style={{borderBottomWidth:1, paddingLeft:10,marginBottom:10, paddingHorizontal:5, color:'#8a8a8a'}}>{item.firstName} {item.lastName}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flex:1, marginRight:20}}>
                                        <Text style={{paddingLeft:10,marginBottom:10, paddingBottom:5, color:'#8a8a8a'}}>{item.age} tahun</Text>

                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('inputKontak',{update: item, diri:this.state.dataDiri})}
                                                style={{flexDirection:'row', flex:1, backgroundColor:'#f2f2f2', borderRadius:5, height:40,justifyContent:'center', alignItems:'center'}}>
                                                <FaIcon name="edit" size={13}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.props.deleteContact(item.id)}
                                                style={{flexDirection:'row',flex:1, backgroundColor:'#f2f2f2', borderRadius:5, marginLeft:5, height:40, justifyContent:'center', alignItems:'center'}}>
                                                <FaIcon name="trash" size={13}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <Image source ={{uri: item.photo}} style={{width:60, height:60, borderRadius:10, resizeMode:'cover'}}/>
                                </View>
                            </View>
                            
                        </Card>
                    )
                }}/>
                }
                <Button onPress={() => this.props.navigation.navigate('inputKontak', {diri: this.state.dataDiri})}
                    style={{backgroundColor:ColorSQL.secondary,bottom:20, justifyContent:'center', alignItems:'center', right:20, position:"absolute", height:50, width: 50,borderRadius:25}}>
                    <FaIcon name="plus-circle" size={36} color={ColorSQL.info}/>
                </Button>
            </Container> 
        );
    }
}
const mapStateToProps = ({ kontak }) => {
    const dataKontak = kontak;
    return { dataKontak }
}
export default connect(
    mapStateToProps, {getContact, putContact, deleteContact}
)(KontakKita);