export class Post {

constructor(
	public title: string,
	public author: string,
	public text: string,
	public date: Date,
	public editedDate?: Date,
	public _id?: string,
	public photo?: string
) { }
}
