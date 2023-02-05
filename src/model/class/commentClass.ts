
export class CommentClass {
    constructor(
        private id: string,
        private user_id_fk: string,
        private post_id_fk: string,
        private comment: string
    ) { }

    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

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

    public getComment() {
        return this.comment
    }
    public setCommet(newComment: string) {
        this.comment = newComment
    }

}