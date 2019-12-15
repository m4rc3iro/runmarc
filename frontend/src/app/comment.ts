export enum CommentType {
  Feedback,
  BlogPost,
}

export class Comment {

  private id: string
  public date: Date
  public author: string
  public email: string
  public text: string
  public type: CommentType
  public display: boolean
  public blogPostId: number

  constructor(author: string, email: string, text: string, type: CommentType, blogPostId?: number) {
    this.date = new Date
    this.author = author
    this.email = email
    this.text = text
    this.type = type
    this.display = false
    this.blogPostId = blogPostId;
  }
}
