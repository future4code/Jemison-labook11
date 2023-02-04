

export class LikeClass {
    constructor(
        private user_id_fk: string,
        private post_id_fk: string,
    ) { }

    public getUserId() {
        return this.user_id_fk
    }
    public setUserId(newUserId: string) {
        this.user_id_fk = newUserId
    }

    public getPostId() {
        return this.post_id_fk
    }
    public setPostId(newPostId: string) {
        this.post_id_fk = newPostId
    }
}