import { action, computed, makeObservable, observable } from "mobx"

class DataStore{
    baseUrl='http://127.0.0.1:8000/'
     Items=[]

    constructor(){
        makeObservable(this , {
            Items :observable,
            submit :action,
            UpdateTask : action,
            update : action,
            getData :computed,
        })
    }

    submit=(newItem)=>{
        this.Items = [...this.Items, newItem]
    }

    UpdateTask=(id)=>{
        Items.forEach((element)=>{
            if(element.id == id){
            setTitle(element.title)
            setBtn(false)
            setUpdateId(id)
            }
        })
    }
}
export const ItemsList = new DataStore();