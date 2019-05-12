export class Comment {

  private id: string
  public date: Date
  public author: string
  public email: string
  public text: string
  public display: boolean

  constructor(id?: string, date?: Date, author?: string, email?: string, text?: string, display?: boolean) {
    this.id = id
    this.date = date
    this.author = author
    this.email = email
    this.text = text
    this.display = display
  }

}
