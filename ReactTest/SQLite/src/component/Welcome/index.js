import { Button, Card, CardItem, Container, Content, Input, Item, Label } from 'native-base';
import React, { Component } from 'react';
import { Alert, Dimensions, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import FaIcon from 'react-native-vector-icons/FontAwesome5'
import ColorSQL from '../../thema/colorSQL';
const FULLWIDTH = Dimensions.get('window').width;

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            baru:true,
            modal: false,
            username:'',
            email:'',
            phone:'',
            dataUser:[],
            pilihUser:{},
            simpan: true,
        }
        this.initState()
    }
    initState(){
        var db = openDatabase({ name: 'AkunMobile.db' });
        db.transaction((txn) =>{
            txn.executeSql(
              "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
              [],
              (tx, res) =>{
                console.log('item:', res.rows.length);
                if (res.rows.length == 0) {
                  txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                  txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                    []
                  );
                  this.setState({baru: true})
                }else{
                    console.log('item2:', res.rows.length);
                    tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                        if(results.rows.length === 0){
                            this.setState({baru: true})
                        }else{
                            this.setState({baru: false})
                        }
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i){
                            temp.push(results.rows.item(i));
                        }
                        this.setState({dataUser: temp, pilihUser:temp[results.rows.length - 1]})
                      });
                }
              }
            );
          });
    }
    listHeader(){
        return(
            <View style={{flexDirection:'row'}}>
                <Text style={{flex:1, color:ColorSQL.info, fontSize:16, fontWeight:'bold', textAlign:'center'}}>Pilih User untuk Masuk Aplikasi</Text>
            </View>
        )
    }
    render() { 
        return (  
            <Container style={{backgroundColor:ColorSQL.primary, padding:20}}>
                    <View style={{justifyContent:'center', alignItems:'center', marginTop:30}}>
                        <FaIcon name="accusoft" size={50} color={ColorSQL.info}/>
                        <Text style={{color:'white', textAlign:'center', fontWeight:'bold', fontSize:24}}>Halo Selamat Datang Di Aplikasi Kami</Text>
                    </View>
                        {this.state.baru ? 
                            <View style={{margin:40}}>
                                <Text style={{textAlign:'center', fontSize:16, color:'white', marginBottom:10}}>Anda Belum Terdaftar</Text>
                                <Button onPress={() => this.setState({modal:true})}
                                    style={{backgroundColor:ColorSQL.secondary}}>
                                    <Text style={{flex:1,textAlign:'center', color:'white', fontWeight:'bold'}}>Isi Data</Text>
                                </Button>
                            </View>:
                            <FlatList 
                                style={{marginVertical:20}}
                                ListHeaderComponent = {this.listHeader}
                                data={this.state.dataUser.sort((a,b) => b.user_id-a.user_id)}
                                keyExtractor={item => item.user_id}
                                renderItem={({item, index}) =>{
                                    return(
                                        <TouchableOpacity onPress={() => this.setState({pilihUser: item})}>
                                            {this.state.pilihUser === item
                                            ?
                                            <Card style={{backgroundColor:ColorSQL.info,width:FULLWIDTH-40, padding:10}}>
                                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                                    <Text style={{color: ColorSQL.secondary, fontWeight:'bold'}}>{item.user_name}</Text>
                                                    <View style={{flex:1, alignItems:'flex-end'}}>
                                                        <Text style={{color: ColorSQL.secondary, fontWeight:'bold'}}>{item.user_contact}</Text>
                                                        <Text style={{color: ColorSQL.secondary, fontWeight:'bold'}}>{item.user_address}</Text>
                                                    </View>
                                                </View>
                                            </Card>:
                                            <Card style={{backgroundColor:'white', width:FULLWIDTH-40, padding:10}}>
                                                <View style={{flexDirection:'row', alignItems:'center'}}>
                                                    <Text style={{color: 'black', fontWeight:'bold'}}>{item.user_name}</Text>
                                                    <View style={{flex:1, alignItems:'flex-end'}}>
                                                        <Text style={{color: 'black', fontWeight:'bold'}}>{item.user_contact}</Text>
                                                        <Text style={{color: 'black', fontWeight:'bold'}}>{item.user_address}</Text>
                                                    </View>
                                                </View>
                                            </Card>}
                                            
                                        </TouchableOpacity>
                                    )
                                }}/>
                            }
                            {this.state.baru ?
                                null:
                                <View>
                                    <View style={{flexDirection:'row', marginBottom:5}}>
                                        <Button onPress={() => this.setState({
                                          modal: true, simpan:true,username:'',phone:'',email:''})}
                                            style={{backgroundColor:ColorSQL.info, flex:1, marginRight:4, justifyContent:'center'}}>
                                            <Text style={{color:ColorSQL.success, fontSize:16, fontWeight:'bold', textAlign:'center'}}>Tambah User</Text>
                                        </Button>
                                        <Button onPress={() =>this.setState({
                                            simpan:false,
                                            modal: true,
                                            username: this.state.pilihUser.user_name,
                                            email:this.state.pilihUser.user_address,
                                            phone: JSON.stringify(this.state.pilihUser.user_contact)
                                        })}
                                            style={{backgroundColor:ColorSQL.secondary, marginHorizontal:2, flex:1, justifyContent:'center'}}>
                                            <Text style={{color:ColorSQL.success, fontSize:16, fontWeight:'bold', textAlign:'center'}}>Update User</Text>
                                        </Button>
                                        <Button onPress={() => this.kepastianDelet()}
                                            style={{backgroundColor:ColorSQL.danger, marginLeft:4, flex:1, justifyContent:'center'}}>
                                            <Text style={{color:ColorSQL.success, fontSize:16, fontWeight:'bold', textAlign:'center'}}>Delete User</Text>
                                        </Button> 
                                    </View>
                                    <Button onPress={() => this.props.navigation.navigate('kontak',{diri: this.state.pilihUser})}
                                        style={{backgroundColor:ColorSQL.success}}>
                                        <Text style={{color:ColorSQL.secondary, flex:1, fontSize:16, fontWeight:'bold', textAlign:'center'}}>Masuk</Text>
                                    </Button>
                                </View>
                            }
                    

                <Modal transparent={true} visible={this.state.modal} animationType="slide">
                    <Container style={{backgroundColor:'rgba(255,255,255, 0.5)', justifyContent:'flex-end'}}>
                        <View style={{backgroundColor:'white', borderTopLeftRadius:20, borderTopRightRadius:20, padding:20}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:1}}/>
                                <TouchableOpacity onPress={() => this.setState({modal:false})}
                                    style={{borderWidth:1, width:40, height:40, borderRadius:20, justifyContent:'center', alignItems:'center'}}>
                                    <FaIcon name="times" size={18}/>
                                </TouchableOpacity>
                            </View>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Username</Label>
                                <Input value={this.state.username} onChangeText={(text) => this.setState({username:text})}/>
                            </Item>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Phone</Label>
                                <Input keyboardType="number-pad" value={this.state.phone} onChangeText={(text) => this.setState({phone:text})}/>
                            </Item>
                            <Item floatingLabel style={{marginBottom:10}}>
                                <Label>Email</Label>
                                <Input keyboardType="email-address" value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
                            </Item>

                            {this.state.simpan ?<Button onPress={() => this.AddUser()}
                                style={{backgroundColor:ColorSQL.secondary, marginHorizontal:40}}>
                                <Text style={{flex:1, textAlign:'center', color:'white'}}>Simpan User</Text>
                            </Button>:
                            <Button onPress={() => this.UpdateUser()}
                                style={{backgroundColor:ColorSQL.secondary, marginHorizontal:40}}>
                                <Text style={{flex:1, textAlign:'center', color:'white'}}>Update User</Text>
                            </Button>}
                        </View>
                    </Container>
                </Modal>
            </Container>
        );
    }

    AddUser(){
        if (this.state.username === '') {
            alert('Please fill name');
            return;
          }
          if (this.state.phone === '') {
            alert('Please fill Contact Number');
            return;
          }
          if (this.state.email === '') {
            alert('Please fill Address');
            return;
          }
          var db = openDatabase({ name: 'AkunMobile.db' });
          db.transaction( (tx)=> {
              
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
              [this.state.username, this.state.phone, this.state.email],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => this.refresh(),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Registration Failed');
              }
            );
          });
    }
    UpdateUser(){
        if (this.state.username === '') {
            alert('Please fill name');
            return;
          }
          if (this.state.phone === '') {
            alert('Please fill Contact Number');
            return;
          }
          if (this.state.email === '') {
            alert('Please fill Address');
            return;
          }
        var db = openDatabase({ name: 'AkunMobile.db' });
        db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
              [this.state.username, this.state.phone, this.state.email, this.state.pilihUser.user_id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => this.refresh(),
                      },
                    ],
                    { cancelable: false }
                  );
                } else alert('Updation Failed');
              }
            );
          });
    }
    kepastianDelet(){
      Alert.alert(
        'Yakin Mau Hapus',
        this.state.pilihUser.user_name,
        [
          {
            text: 'Yakin',
            onPress: () => this.deleteUser(),
          },
          {
            text: 'Batal',
            onPress: () => this.refresh(),
          },
        ],
        { cancelable: false }
      );
    }
    deleteUser(){
        var db = openDatabase({ name: 'AkunMobile.db' });
        db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM  table_user where user_id=?',
              [this.state.pilihUser.user_id],
              (tx, results) => {
                console.log('Results delete', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User deleted successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => this.refresh(),
                      },
                    ],
                    { cancelable: false }
                  );
                } else {
                  alert('Please insert a valid User Id');
                }
              }
            );
          });
    }
    refresh(){
        this.setState({
          modal:false,
        })
        this.initState()
    }
}
 
export default Welcome;