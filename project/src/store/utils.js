import firebase from "@/firebase.js";

export async function getDoc(collection, id){
    let materiel = firebase.db.collection(collection).doc(id);
    let doc = await materiel.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }
}

export async function createDoc(collection, data){
    data = {
      nom : "Iphone 11",
      ref : "AP11",
      tel: 699999999,
      version : "V9.0"
    } 
    await firebase.db.collection(collection).doc().set(data);
}