
export class FriendshipClass {
    constructor(
        private user_sender_fk: string,
        private user_reciever_fk: string,
    ) { }

    public getUserSender() {
        return this.user_sender_fk
    }
    public setUserSender(newUserSender: string) {
        this.user_sender_fk = newUserSender
    }

    public getUserReciever() {
        return this.user_reciever_fk
    }
    public setUserReciever(newUserReciever: string) {
        this.user_reciever_fk = newUserReciever
    }
}