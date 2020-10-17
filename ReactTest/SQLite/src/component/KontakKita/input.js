import { Button, Card, CardItem, Container, Header, Input, Item, Label, Spinner } from 'native-base';
import React, { Component } from 'react';
import { Dimensions, FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import { connect } from 'react-redux';
import ColorSQL from '../../thema/colorSQL';
import {postContact, putContact} from '../../action'
const FULLWIDTH = Dimensions.get('window').width
class InputKontak extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            dbImage:[
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRayYv-U0Pqj2JWx5bpGnNd7ZubTIDXkqxC8w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSEWwcVbvblwuurbdzag_6cuvZLzbxJALijsA&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTBAVl1v1dGdoHFLOfHInpgGA320GjwCKNpNw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvpT7ImoMGaXPOalzMCpcKJimpgEYmCW-D_Q&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCV-aU5w3psY0mMM8d_aJd3HDWNxfT7B7n3w&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR3scHiJqGb-0gywDoiG4KfxVCrLqTLbTdTug&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRv-xZsSf_obAScxfHsWd1tNIa4fn6RSAVTGw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQuPAvO-gOTjn2QvSk70DalwM7x20s2k9S-MQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSxx7p97VBLquLL3_dF9qZRt2ztXO6v4FO1vw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRv-xZsSf_obAScxfHsWd1tNIa4fn6RSAVTGw&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTWQE7OY8KTbSTe1pqxS9h27mnRdjqhPXWj_A&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQK11djvY7vg3R8HET8p2nME_9dryzT-enC1g&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQFTVXE5ABpiexz6CtNPgfDyRr3LguistBrdQ&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcVXCp-bxR9c4r7Jtmbuw_LFpB4dKurPHN3g&usqp=CAU",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuFZheg0dQ6Dx7rMYoIfwOzw5ZWSG2WHX2ew&usqp=CAU"
            ],
            modal: false,
            imagePilih: props.navigation.getParam('update', '').photo,
            firstName:props.navigation.getParam('update', '').firstName,
            lastName:props.navigation.getParam('update', '').lastName,
            umur:props.navigation.getParam('update', '') !== '' ? props.navigation.getParam('update', '').age.toString():'',
            load:false,
            edit: props.navigation.getParam('update','')
        }
    }
    componentWillReceiveProps(newProps){
        if(this.props.dataKontak !== newProps.dataKontak){
            console.log(newProps.dataKontak)
            if(newProps.dataKontak.post){
                console.log(newProps.dataKontak.post.message)
                if(newProps.dataKontak.post.message==='contact saved'){
                    this.props.navigation.navigate('kontak', {diri: this.props.navigation.getParam('diri')})
                }
            }
            if(newProps.dataKontak.put){
                if(newProps.dataKontak.put.message==='Contact edited'){
                    this.props.navigation.navigate('kontak', {diri: this.props.navigation.getParam('diri')})
                }
                
            }
        }
    }
    render() { 
        
        return (  
            <Container>
                <Header style={{justifyContent:'flex-start', alignItems:'center', backgroundColor:ColorSQL.primary}}>
                    <TouchableOpacity style={{paddingRight:10}} onPress={() => this.props.navigation.navigate('kontak', {diri: this.props.navigation.getParam('diri')})}>
                        <FaIcon name="arrow-left" size={20} color="white"/>
                    </TouchableOpacity>
                    <Text style={{color:'white'}}>Input Kontak</Text>
                </Header>
                
                <View style={{margin:20, flex:1}}>
                    <Card>
                        <TouchableOpacity onPress={() => this.setState({modal:true})}
                            style={{height:80, borderColor:'grey', marginTop:10, padding:5, width:80, borderWidth:1, alignSelf:'center', borderRadius:10, justifyContent:'center', alignItems:'center'}}>
                            {this.state.imagePilih ===undefined?
                                <Text style={{fontSize:12, color:'grey'}}>Pilih Gambar</Text>:
                                <Image style={{height:75, width:75, resizeMode:'cover', borderRadius:10}} source={{uri:this.state.imagePilih}}/>
                            }
                        </TouchableOpacity>
                        <CardItem>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Nama Depan</Label>
                                <Input value={this.state.firstName} onChangeText={(text) => this.setState({firstName:text})}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Nama Belakang</Label>
                                <Input value={this.state.lastName} onChangeText={(text) => this.setState({lastName:text})}/>
                            </Item>
                        </CardItem>
                        <CardItem>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Umur</Label>
                                <Input keyboardType="number-pad" value={this.state.umur} onChangeText={(text) => this.setState({umur:text})}/>
                            </Item>
                        </CardItem>
                    </Card>
                </View>
                <Button onPress={() =>this.state.edit === ''? this.Simpan(): this.Update()} disabled={this.state.load}
                    style={{position:'absolute', bottom:20, left:20, right:20, backgroundColor:ColorSQL.secondary, borderRadius:10}}>
                    {this.state.load ?
                        <View style={{flex:1}}>
                            <Spinner style={{alignSelf:'center'}} color={ColorSQL.info}/>
                        </View>:
                        this.state.edit === '' ?<Text style={{color:ColorSQL.info, textAlign:'center', flex:1}}>Simpan</Text>:
                        <Text style={{color:ColorSQL.info, textAlign:'center', flex:1}}>Update</Text>
                    }
                </Button>

                <Modal visible={this.state.modal} transparent={true}>
                    <Container style={{backgroundColor:'rgba(0,0,0,0.8)'}}>
                        <View style={{alignItems:'center', flex:1}}>
                            <FlatList 
                                ListHeaderComponent={
                                    <Text style={{alignSelf:'center', fontSize:24, margin:20, color:'white'}}>Gambar Kontak</Text>
                                }
                                numColumns={4}
                                keyExtractor={item => item}
                                data={this.state.dbImage}
                                renderItem={({item}) =>{
                                    return(
                                        <TouchableOpacity onPress={() => this.setState({imagePilih: item, modal:false})}
                                            style={{width:FULLWIDTH/4-3, height:FULLWIDTH/4-3}}>
                                            <Image source={{uri: item}} style={{width:FULLWIDTH/4-5, height:FULLWIDTH/4-5}}/>
                                        </TouchableOpacity>
                                    )
                                }}/>
                            <TouchableOpacity onPress={() => this.setState({modal: false})}
                                style={{borderWidth:2, marginBottom:20, width:40, height:40, borderRadius:20, justifyContent:'center', alignItems:'center', borderColor:ColorSQL.danger}}>
                                <FaIcon name="times" size={20} color={ColorSQL.danger}/>
                            </TouchableOpacity>
                        </View>
                    </Container>
                </Modal> 
            </Container>
        );
    }

    Simpan(){
        if (this.state.firstName === '') {
            alert('Nama Depan Kosong');
            return;
          }
          if (this.state.lastName === '') {
            alert('Nama Belakang Kosong');
            return;
          }
          if (this.state.umur === '') {
            alert('Umur Kosong');
            return;
          }
          if (this.state.imagePilih === '') {
            alert('Gambar Belum Dipilih');
            return;
          }
        this.setState({
            load: true
        })
        this.props.postContact({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: this.state.umur,
            photo: this.state.imagePilih
        })
    }
    Update(){
        if (this.state.firstName === '') {
            alert('Nama Depan Kosong');
            return;
          }
          if (this.state.lastName === '') {
            alert('Nama Belakang Kosong');
            return;
          }
          if (this.state.umur === '') {
            alert('Umur Kosong');
            return;
          }
          if (this.state.imagePilih === '') {
            alert('Gambar Belum Dipilih');
            return;
          }
        this.setState({
            load: true
        })
        
        this.props.putContact({
            user_id: this.props.navigation.getParam('update', '').id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            age: parseInt(this.state.umur),
            photo: this.state.imagePilih
        })
    }
}
const mapStateToProps = ({ kontak }) => {
    const dataKontak = kontak;
    return { dataKontak }
}
export default connect(
    mapStateToProps, {postContact, putContact}
)(InputKontak);