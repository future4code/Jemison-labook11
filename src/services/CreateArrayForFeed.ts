import { FriendsForFeedDTO } from "../model/DTO/friendshipDTO";

export class CreatArrayForFeed{

    public createArrayForFeed =(array:FriendsForFeedDTO[]):string=>{

        let friendsArray = []
            for (let i = 0; i < array.length; i++) {

        friendsArray.push(`author_id_fk = "${array[i].amigo}" OR`)
    }

    let friendsArrayToString = friendsArray.toString()
    let FriendsArrayWithoutComma = friendsArrayToString.replaceAll(","," ")
    let FriendsArrayWithoutFinalStrings = FriendsArrayWithoutComma.slice(0, -3)
    
    return FriendsArrayWithoutFinalStrings
}
}