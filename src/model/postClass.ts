
export enum TypeEnum {
    NORMAL = 'normal',
    EVENT = 'event'
}

export class PostClass {
    constructor(
        private id: string,
        private photo: string,
        private description: string,
        private type: TypeEnum,
        private author_id_fk: string
    ) { }

    public getId() {
        return this.id
    }
    public setId(newId: string) {
        this.id = newId
    }

    public getPhoto() {
        return this.photo
    }
    public setPhoto(newPhoto: string) {
        this.photo = newPhoto
    }

    public getDescription() {
        return this.description
    }
    public setDescription(newDescription: string) {
        this.description = newDescription
    }

    public getType() {
        return this.type
    }
    public setType(newType: TypeEnum) {
        this.type = newType
    }

    public getAuthorId() {
        return this.author_id_fk
    }
    public setAuthorId(newAuthorId: string) {
        this.author_id_fk = newAuthorId
    }

}